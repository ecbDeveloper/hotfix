import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';
import { StatementType } from '../../common/entities/statement.entity';
import { NotificationType } from '../../common/entities/notification.entity';

@Injectable()
export class StatementNotificationsService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async notifyStatementCreated(userId: string, statement: { id: string, amount: number, type: StatementType }): Promise<void> {
    await this.notificationsService.create({
      userId,
      type: NotificationType.STATEMENT_CREATED,
      title: `Nova ${statement.type === StatementType.CREDIT ? 'entrada' : 'saída'}: R$ ${statement.amount}`,
      message: `Uma nova movimentação foi ${statement.type === StatementType.CREDIT ? 'creditada' : 'debitada'} no valor de R$ ${statement.amount}`,
      metadata: { statementId: statement.id }
    });
  }

  async notifyStatementUpdated(userId: string, statement: { id: string, amount: number, type: StatementType }): Promise<void> {
    await this.notificationsService.create({
      userId,
      type: NotificationType.STATEMENT_UPDATED,
      title: `${statement.type === StatementType.CREDIT ? 'Entrada' : 'Saída'} atualizada: R$ ${statement.amount}`,
      message: `A ${statement.type === StatementType.CREDIT ? 'entrada' : 'saída'} foi atualizada para o valor de R$ ${statement.amount}`,
      metadata: { statementId: statement.id }
    });
  }

  async notifyStatementDeleted(userId: string, statement: { id: string, amount: number, type: StatementType }): Promise<void> {
    await this.notificationsService.create({
      userId,
      type: NotificationType.STATEMENT_DELETED,
      title: `${statement.type === StatementType.CREDIT ? 'Entrada' : 'Saída'} removida: R$ ${statement.amount}`,
      message: `A ${statement.type === StatementType.CREDIT ? 'entrada' : 'saída'} no valor de R$ ${statement.amount} foi removida`,
      metadata: { statementId: statement.id }
    });
  }
}