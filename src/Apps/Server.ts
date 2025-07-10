import lambdaApi, { API, NextFunction, Request, Response } from 'lambda-api';
import HTTP from 'http-status';
import pathPerson from './Mooc/Routes/Person';

export class Server {
  private readonly app: API;
  private readonly ROUTE_ERROR = 'RouteError';
  private readonly METHOD_ERROR = 'MethodError';

  constructor() {
    this.app = lambdaApi();
    this.setRoutes();
  }

  private setRoutes() {
    this.app.register(pathPerson, {
      prefix: '/person',
    });
    this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Card, Content-Length, X-Requested-With',
      );
      res
        .header('X-XSS-Protection', '1; mode=block')
        .header('X-Content-Type-Options', 'nosniff')
        .header('Referrer-Policy', 'no-referrer-when-downgrade')
        .header('X-Frame-Options', 'SAMEORIGIN')
        .header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
        .header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS,PATCH');
      if (error.name === this.ROUTE_ERROR || error.name === this.METHOD_ERROR) {
        res.status(HTTP.FORBIDDEN);
        res.json({
          errors: {
            message: 'Not authorized',
          },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        res.status(error.status || HTTP.INTERNAL_SERVER_ERROR);
        res.json({
          errors: {
            message: error.message,
          },
        });
      }
      return next();
    });

    this.app.options('/*', (req: Request, res: Response): void => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Card, Content-Length, X-Requested-With',
      );
      res.status(HTTP.OK).send({});
    });
  }

  getApp(): API {
    return this.app;
  }
}
