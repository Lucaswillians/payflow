
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications')
export class NotificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column()
  message: string;

  @Column({ type: 'timestamp' })
  date: Date;

  constructor(userId: number, message: string, date: Date = new Date()) {
    this.userId = userId;
    this.message = message;
    this.date = date;
  }
}
