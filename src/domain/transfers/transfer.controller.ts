import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { TransferService } from './transfer.service';

@Controller('transfers')
export class TransfersController {
  constructor(private transfersService: TransferService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async transfer(@Body('payer') payerId: number, @Body('payee') payeeId: number, @Body('value') amount: number
  ): Promise<{ message: string }> {
    await this.transfersService.transfer(payerId, payeeId, amount);
    return { message: 'Transfer successful' };
  }
}