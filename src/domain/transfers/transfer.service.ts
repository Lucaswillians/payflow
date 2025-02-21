import { DataSource } from 'typeorm';
import { BadRequestException, ForbiddenException, Inject, Injectable, Logger } from '@nestjs/common';
import { NotificationService } from '../notifications/notification.service';
import { TransferRepository } from './transfer.repository';
import { UserService } from '../users/user.service';
import { WalletService } from '../wallets/wallet.service';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class TransferService {
  private readonly logger = new Logger(TransferService.name);

    @Inject()
    private readonly authorizationService: AuthorizationService;
  
    @Inject()
    private readonly notificationsService: NotificationService;
  
    @Inject()
    private readonly transfersRepository: TransferRepository;

    @Inject()
    private readonly usersService: UserService;

    @Inject()
    private readonly walletsService: WalletService;
  
    @Inject()
    private readonly dataSource: DataSource;

  async transfer (payerId: number, payeeId: number, amount: number): Promise<void> {
    const payer = await this.usersService.getUser(payerId);
    
    if (!payer) {
      throw new BadRequestException('Payer not found');
    }
    
    if (payer.type !== 'payer') {
      throw new BadRequestException('User is not allowed to send money');
    }

    const payerWallet = await this.walletsService.findOrCreateWalletByUserId(payerId);
    
    if (payerWallet.balance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const authorized = await this.authorizationService.authorize(payerId, payeeId, amount);
    
    if (!authorized) {
      throw new ForbiddenException('Transfer not authorized');
    }

    await this.performTransfer(payerId, payeeId, amount);
  }

  private async performTransfer (payerId: number, payeeId: number, amount: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.walletsService.debit(payerId, amount, queryRunner.manager);
      await this.walletsService.credit(payeeId, amount, queryRunner.manager);

      const transfer = this.transfersRepository.create({ payerId, payeeId, amount });
      await queryRunner.manager.save(transfer);

      await queryRunner.commitTransaction();

      await this.notificationsService.notify(payeeId, `You have received ${amount} from ${payerId}`);

      this.logger.debug(`Transfer completed: ${amount} from ${payerId} to ${payeeId}`);
    }
    catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(`Transfer failed: ${error.message}`);
      throw error;
    } 
    finally {
      await queryRunner.release();
    }
  }
}