import { plainToInstance } from 'class-transformer';
import { BadRequestException, Body, Controller, Get, Inject, Param, ParseIntPipe, Put } from '@nestjs/common';
import { UpdateWalletDto } from './dtos/update-wallet.dto';
import { WalletDto } from './dtos/wallet.dto';
import { WalletService } from './wallet.service';
import { WalletEntity } from './wallet.entity';

@Controller('wallets')
export class WalletController {
  @Inject()
  private readonly walletService: WalletService

  @Get(':userId')
  async getBalance (@Param('userId', ParseIntPipe) userId: number): Promise<WalletDto> {
    const wallet = await this.walletService.findOrCreateWalletByUserId(userId);
    
    return plainToInstance(WalletDto, wallet);
  }

  @Put(':userId')
  async updateWallet(@Param('userId', ParseIntPipe) userId: number, @Body() dto: UpdateWalletDto): Promise<WalletDto> {
    let wallet: WalletEntity;

    if (dto.operation === 'credit') wallet = await this.walletService.credit(userId, dto.amount);
   
    if (dto.operation === 'debit') wallet = await this.walletService.debit(userId, dto.amount); 
    
    else throw new BadRequestException('Invalid operation');
  
    return plainToInstance(WalletDto, wallet);
  }
}