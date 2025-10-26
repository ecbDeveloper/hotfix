import { Body, Controller, Post, Headers, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { WebhookPaymentDto } from './dto/webhook-payment.dto';
import { ConfigService } from '@nestjs/config';

@ApiTags('Webhooks')
@Controller('webhooks')
export class WebhooksController {
  constructor(
    private readonly webhooksService: WebhooksService,
    private readonly configService: ConfigService,
  ) {}

  @Post('payment')
  @ApiOperation({ summary: 'Handle payment webhook' })
  @ApiResponse({ status: 200, description: 'Payment processed successfully' })
  async handlePaymentWebhook(
    @Headers('x-webhook-signature') signature: string,
    @Body() paymentData: WebhookPaymentDto,
  ) {
    // Verify webhook signature
    if (!this.verifyWebhookSignature(signature, paymentData)) {
      throw new UnauthorizedException('Invalid webhook signature');
    }

    return this.webhooksService.handlePaymentWebhook(paymentData);
  }

  private verifyWebhookSignature(signature: string, payload: any): boolean {
    // Get webhook secret from environment
    const webhookSecret = this.configService.get<string>('WEBHOOK_SECRET');

    if (!webhookSecret || !signature) {
      return false;
    }

    // TODO: Implement proper signature verification
    // This is a placeholder. You should implement proper HMAC verification
    return true;
  }
}