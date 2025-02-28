import { Inject, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { EmailNotifier } from "src/services/notifier/email.notifier";
import { Repository } from "typeorm";
import { NotificationEntity } from "./notification.entity";
import { UserService } from "../users/user.service";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NotificationService {
  private readonly logger = new Logger(NotificationService.name);

  @Inject()
  private readonly emailNotifier: EmailNotifier;

  @InjectRepository(NotificationEntity)
  private readonly notificationRepository: Repository<NotificationEntity>
  
  @Inject()
  private readonly userService: UserService;

  async notify (userId: number, message: string): Promise<void> {
    const user = await this.userService.getUser(userId);

    if (!user) throw new NotFoundException(`User ${userId} not found`);

    await this.emailNotifier.send(user.email, message);

    const notification = this.notificationRepository.create({ userId, message, date: new Date() });

    await this.notificationRepository.save(notification);

    this.logger.debug(`Notification sent to user ${userId}: ${message}`);
  }

  async findByUserId(userId: number): Promise<NotificationEntity[]> {
    return this.notificationRepository.find({ where: { userId } });
  }
}