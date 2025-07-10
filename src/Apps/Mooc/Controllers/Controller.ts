import { Request, Response } from 'lambda-api';

export interface Controller {
  run(req: Request, res: Response): Promise<void>;
}
