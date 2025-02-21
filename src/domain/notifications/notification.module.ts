import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/user.module';
import { NotificationService } from './notification.service';
import { NotificationEntity } from './notification.entity';
import { NotifierModule } from 'src/services/notifier/notifier.module';

@Module({
  imports: [TypeOrmModule.forFeature([NotificationEntity]), UsersModule, NotifierModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationsModule { }