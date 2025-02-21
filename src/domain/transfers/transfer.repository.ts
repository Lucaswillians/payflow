import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TransferEntity } from './transfer.entity';

@Injectable()
export class TransferRepository extends Repository<TransferEntity> {
  constructor(dataSource: DataSource) {
    super(TransferEntity, dataSource.manager);
  }

  async findByUserId(userId: number): Promise<TransferEntity[]> {
    return this.find({ where: [{ payerId: userId }, { payeeId: userId }] });
  }
}