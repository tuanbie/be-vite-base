import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'express';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp().getResponse<Response>();
    return next.handle().pipe(
      map((res) => {
        if (res)
          return res.hasOwnProperty('paginationOptions')
            ? {
                code: ctx.statusCode || 200,
                // success: true,
                msg: res.message,
                data: res.data || null,
              }
            : res.hasOwnProperty('message')
              ? {
                  code: ctx.statusCode || 200,
                  // success: true,
                  msg: res.message,
                  data: res.data || null,
                }
              : {
                  code: ctx.statusCode || 200,
                  msg: res.message,
                  // success: true,]
                  data: res || null,
                };
      }),
    );
  }
}
