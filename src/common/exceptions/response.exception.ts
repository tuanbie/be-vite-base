import { HttpException, HttpStatus } from '@nestjs/common';

export class ExceptionResponse extends HttpException {
  constructor(status?: HttpStatus, message?: string, data?: any) {
    super(
      {
        code: status ? status : HttpStatus.BAD_REQUEST,
        msg: message ? message : 'Invalid data!',
        data: data || null,
      },
      (status = HttpStatus.OK),
    );
  }
}

export class CatchException extends ExceptionResponse {
  constructor(error: any) {
    super(error?.response?.status, error.message);
  }
}
