import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbConfigService } from './config/db.config.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './domain/users/user.module';
import { NotificationsModule } from './domain/notifications/notification.module';
import { TransfersModule } from './domain/transfers/transfer.module';
import { WalletsModule } from './domain/wallets/wallet.module';

@Module({
  imports: [
    NotificationsModule,
    TransfersModule,
    UsersModule,
    WalletsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: DbConfigService, inject: [DbConfigService] }),
  ],
})
export class AppModule { }