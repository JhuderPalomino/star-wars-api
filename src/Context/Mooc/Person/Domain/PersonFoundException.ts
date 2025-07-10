import httpStatus from 'http-status';

export class PersonFoundException extends Error {
  readonly status: number;

  constructor(message: string) {
    super(message);
    this.status = httpStatus.BAD_REQUEST;
  }
}
