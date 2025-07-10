import httpStatus from 'http-status';

export class PersonNotFoundException extends Error {
  readonly status: number;

  constructor(message: string) {
    super(message);
    this.status = httpStatus.NOT_FOUND;
  }
}
