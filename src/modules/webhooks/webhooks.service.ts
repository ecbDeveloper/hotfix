import { Injectable } from '@nestjs/common';
import { StatementsService } from '../statements/statements.service';
import { WebhookPaymentDto } from './dto/webhook-payment.dto';
import { StatementType, StatementStatus } from '../../common/entities/statement.entity';

@Injectable()
export class WebhooksService {
  constructor(private readonly statementsService: StatementsService) {}

  async handlePaymentWebhook(paymentData: WebhookPaymentDto) {
    const statement = await this.statementsService.create({
      userId: paymentData.userId,
      amount: paymentData.amount,
      type: StatementType.CREDIT,
      status: StatementStatus.COMPLETED,
      description: `Payment received - ${paymentData.paymentMethod}`,
      referenceId: paymentData.referenceId,
      referenceType: 'payment',
      metadata: {
        paymentId: paymentData.paymentId,
        paymentMethod: paymentData.paymentMethod,
        externalReference: paymentData.externalReference,
      },
    });

    return statement;
  }
}