import { EntityManager } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { WalletRepository } from './wallet.repository';
import { WalletEntity } from './wallet.entity';

@Injectable()
export class WalletService {
  @Inject()
  private readonly walletsRepository: WalletRepository

  async credit (userId: number, amount: number, manager?: EntityManager): Promise<WalletEntity> {
    const wallet = await this.findOrCreateWalletByUserId(userId, manager);
    wallet.credit(amount);
    
    return await this.walletsRepository.saveWallet(wallet, manager);
  }

  async debit (userId: number, amount: number, manager?: EntityManager): Promise<WalletEntity> {
    const wallet = await this.findOrCreateWalletByUserId(userId, manager);
    wallet.debit(amount);
    
    return await this.walletsRepository.saveWallet(wallet, manager);
  }

  async findOrCreateWalletByUserId (userId: number, manager?: EntityManager): Promise<WalletEntity> {
    let wallet = await this.walletsRepository.findByUserId(userId, manager);
   
    if (!wallet) {
      wallet = WalletEntity.create(userId);
      wallet = await this.walletsRepository.saveWallet(wallet, manager);
    }
    
    return wallet;
  }
}