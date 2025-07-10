import { Response } from 'lambda-api';
import httpStatus from 'http-status';

export class BuildResponse {
  static async run(response: any, res: Response) {
    const code = response?.status || response?.error?.status || httpStatus.OK;
    const message = response.message || response.error?.message || response;
    return this.header(res).status(code).json(this.buildMessage(code, message));
  }

  static buildMessage(code: number, message: string) {
    if (code === httpStatus.OK || code === httpStatus.CREATED) {
      return message;
    }

    return {
      errors: {
        message,
      },
    };
  }

  static header(res: Response): Response {
    const weborigin = '*';
    if (weborigin === '*') {
      res = res.header('Access-Control-Allow-Origin', '*');
    }
    return (
      res
        .header('X-XSS-Protection', '1; mode=block')
        .header('X-Content-Type-Options', 'nosniff')
        .header('Referrer-Policy', 'no-referrer-when-downgrade')
        .header('X-Frame-Options', 'SAMEORIGIN')
        // .header("Access-Control-Allow-Credentials", true)
        .header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        .header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS,PATCH')
        .header(
          'Access-Control-Allow-Headers',
          'Content-Type, Authorization, Content-Length, X-Requested-With',
        )
    );
  }
}
