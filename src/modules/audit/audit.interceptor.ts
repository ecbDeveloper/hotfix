import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditService } from './audit.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly auditService: AuditService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { user, method, body, params } = request;

    let action: 'create' | 'update' | 'delete';
    switch (method) {
      case 'POST':
        action = 'create';
        break;
      case 'PATCH':
      case 'PUT':
        action = 'update';
        break;
      case 'DELETE':
        action = 'delete';
        break;
      default:
        return next.handle();
    }

    return next.handle().pipe(
      tap(async (data) => {
        if (!data || !data.id) return;

        await this.auditService.logStatementChange({
          statementId: data.id,
          userId: user?.id,
          action,
          oldData: action === 'update' ? { ...params } : undefined,
          newData: ['create', 'update'].includes(action) ? body : undefined,
        });
      }),
    );
  }
}