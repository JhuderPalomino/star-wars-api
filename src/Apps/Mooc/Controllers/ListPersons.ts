import { Controller } from './Controller';
import { Request, Response } from 'lambda-api';
import { BuildResponse } from '../../../Context/Mooc/Shared/Infrastructure/Response/BuildResponse';
import { MySqlPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/MySqlPersonRepository';
import { MySqlFactory } from '../../../Context/Shared/Infrastructure/Persistence/MySql/MySqlFactory';
import { MySqlConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/MySql/MySqlConfigFactory';

import httpStatus from 'http-status';
import { PaginatePersons } from '../../../Context/Mooc/Person/Application/PaginatePersons';
import { RedisFactory } from '../../../Context/Shared/Infrastructure/Persistence/Redis/RedisFactory';
import { RedisConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/Redis/RedisConfigFactory';
import { RedisPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/RedisPersonRepository';

export class ListPersons implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    try {
      const personRepository = new MySqlPersonRepository(
        MySqlFactory.createClient(MySqlConfigFactory.createConfig()),
      );

      const cacheRepository = new RedisPersonRepository(
        RedisFactory.getOrCreateClient(RedisConfigFactory.createConfig()),
      );

      const paginatePersons = new PaginatePersons(personRepository, cacheRepository);
      const response = await paginatePersons.run(
        Number(req.query.page || 1),
        Number(req.query.perPage || 10),
      );
      return BuildResponse.run(response, res);
    } catch (e: Error | any) {
      console.error('> ListPersons: ', e);
      return BuildResponse.run(
        { status: e.status || httpStatus.BAD_REQUEST, message: e.message },
        res,
      );
    }
  }
}
