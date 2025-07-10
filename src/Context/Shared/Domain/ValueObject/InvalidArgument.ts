import httpStatus from 'http-status';

export class InvalidArgumentError extends Error {
  readonly status: number;

  constructor(message: string, status: number = httpStatus.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}
