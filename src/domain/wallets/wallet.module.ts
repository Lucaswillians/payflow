import { EventSourcingModule } from 'src/services/event-sourcing/event-sourcing.module';
import { Module } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
@Module({
  imports: [EventSourcingModule],
  providers: [WalletRepository, WalletService],
  exports: [WalletService],
  controllers: [WalletController],
})
export class WalletsModule { }