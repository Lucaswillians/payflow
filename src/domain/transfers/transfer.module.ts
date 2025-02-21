import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsModule } from '../notifications/notification.module';
import { UsersModule } from '../users/user.module';
import { WalletsModule } from '../wallets/wallet.module';
import { TransferEntity } from './transfer.entity';
import { AuthorizationService } from './authorization.service';
import { TransferRepository } from './transfer.repository';
import { TransferService } from './transfer.service';
import { TransfersController } from './transfer.controller';

@Module({
  imports: [
    NotificationsModule,
    UsersModule,
    WalletsModule,
    TypeOrmModule.forFeature([TransferEntity]),
  ],
  providers: [AuthorizationService, TransferRepository, TransferService],
  exports: [TransferService],
  controllers: [TransfersController],
})
export class TransfersModule { }