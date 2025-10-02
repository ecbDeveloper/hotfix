import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { toCamelCase, toSnakeCase } from '../utils/case-converter';
import { Request } from 'express';
import { map } from 'rxjs/operators';

@Injectable()
export class SnakeToCamelInterceptor implements NestInterceptor {
  public intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const httpContext = context.switchToHttp();

    const request: Request = httpContext.getRequest();
    if (request.body) {
      request.body = toCamelCase(request.body);
    }

    return next.handle().pipe(
      map(data => {
        return toSnakeCase(data)
      })
    );
  }
}
