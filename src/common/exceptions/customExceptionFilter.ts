import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private static handleResponse(
    ctx: HttpArgumentsHost,
    exception: HttpException | Error,
  ): void {
    let responseBody: any = { message: 'Internal server error' };
    let code = HttpStatus.INTERNAL_SERVER_ERROR;
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      code = exception.getResponse()['statusCode'];
      let msg = exception.getResponse()['message'];

      if (Array.isArray(msg)) {
        msg = msg.join(', ');
      }
      responseBody = {
        code: code || exception.getStatus(),
        msg: msg || exception.message,
        data: null,
        // timestamp: new Date().toISOString(),
        path: request.url,
      };
    } else if (exception instanceof Error) {
      responseBody = {
        code: code || code,
        message: exception.stack,
        data: null,
        timestamp: new Date().toISOString(),
        path: request.url,
      };
    }
    if (code == 205) {
      code = 400;
    }
    Logger.error(responseBody);
    response
      .status(code || HttpStatus.INTERNAL_SERVER_ERROR)
      .json(responseBody);
  }

  private handleMessage(exception: HttpException | Error): void {
    let msg = 'Internal Server Error';
    if (exception instanceof HttpException)
      msg = JSON.stringify(exception.getResponse());
    else if (exception instanceof Error)
      msg = JSON.stringify(exception.stack.toString());
  }

  public catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();

    //Handling error message and logging
    this.handleMessage(exception);

    //Response to client
    AllExceptionFilter.handleResponse(ctx, exception);
  }
}
