
import {
  EventSourcingEventEntity
} from 'src/services/event-sourcing/event-sourcing-event.entity';
import {
  EventSourcingRepository
} from 'src/services/event-sourcing/event-sourcing.repository';
import { EntityManager } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { WalletEntity } from './wallet.entity';

@Injectable()
export class WalletRepository {

  @Inject()
  private readonly eventSourcingRepository: EventSourcingRepository;

  async saveWallet (wallet: WalletEntity, manager?: EntityManager): Promise<WalletEntity> {
    const uncommittedEvents = wallet.getUncommittedEvents();
    const eventsToSave = uncommittedEvents.map((event) => {
    const eventEntity = new EventSourcingEventEntity();
      eventEntity.entityId = wallet.id;
      eventEntity.entityName = 'Wallet';
      eventEntity.eventType = event.eventType;
      eventEntity.payload = event.payload;
      return eventEntity;
    });

    await this.eventSourcingRepository.saveEvents(eventsToSave, manager);
    wallet.clearUncommittedEvents();
    
    return wallet;
  }

  async findByUserId (userId: number, manager?: EntityManager): Promise<WalletEntity | undefined> {
    const events = await this.eventSourcingRepository.findEventsForEntity('Wallet', userId, manager);

    if (events.length === 0) return undefined;

    const wallet = new WalletEntity();
    wallet.loadFromHistory(events);

    return wallet;
  }
}
