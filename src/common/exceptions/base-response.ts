interface Response {
  code?: number;
  msg?: string;
  data?: any;
}

export class BaseResponse<T> {
  readonly code: number;
  readonly msg: string;
  readonly data: T;

  constructor({ code, msg, data }: Response) {
    this.code = code || 200;
    this.msg = msg || 'Success';
    this.data = data || null;
  }
}
