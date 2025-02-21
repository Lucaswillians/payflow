import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from 'src/domain/users/user.entity';
import { NotificationEntity } from 'src/domain/notifications/notification.entity';
import { TransferEntity } from 'src/domain/transfers/transfer.entity';
import { WalletEntity } from 'src/domain/wallets/wallet.entity';
import { EventSourcedEntity } from 'src/services/event-sourcing/event-sourced.entity';
import { EventSourcingEventEntity } from 'src/services/event-sourcing/event-sourcing-event.entity';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) { }


  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [UserEntity, NotificationEntity, TransferEntity, WalletEntity, 
        EventSourcedEntity, EventSourcingEventEntity],
      synchronize: true,
    };
  }
}
