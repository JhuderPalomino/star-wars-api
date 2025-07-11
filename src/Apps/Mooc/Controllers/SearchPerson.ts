import { Controller } from './Controller';
import { Request, Response } from 'lambda-api';
import { BuildResponse } from '../../../Context/Mooc/Shared/Infrastructure/Response/BuildResponse';
import { MySqlPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/MySqlPersonRepository';
import { MySqlFactory } from '../../../Context/Shared/Infrastructure/Persistence/MySql/MySqlFactory';
import { MySqlConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/MySql/MySqlConfigFactory';
import { SearchPersonByName } from '../../../Context/Mooc/Person/Application/SearchPersonByName';
import { PersonName } from '../../../Context/Mooc/Person/Domain/PersonName';
import { ExternalPersonApiRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/ExternalPersonApiRepository';
import { SwapiFactory } from '../../../Context/Shared/Infrastructure/Persistence/Swapi/SwapiFactory';
import { SwapiConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/Swapi/SwapiConfigFactory';
import httpStatus from 'http-status';
import { RedisPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/RedisPersonRepository';
import { RedisFactory } from '../../../Context/Shared/Infrastructure/Persistence/Redis/RedisFactory';
import { RedisConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/Redis/RedisConfigFactory';
import { ExternalPhraseApiRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/ExternalPhraseApiRepository';
import { QuotaFactory } from '../../../Context/Shared/Infrastructure/Persistence/Quota/QuotaFactory';
import { QuotaConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/Quota/QuotaConfigFactory';

export class SearchPerson implements Controller {
  async run(req: Request, res: Response): Promise<void> {
    try {
      const personRepository = new MySqlPersonRepository(
        MySqlFactory.createClient(MySqlConfigFactory.createConfig()),
      );
      const personExternalRepository = new ExternalPersonApiRepository(
        SwapiFactory.createClient(SwapiConfigFactory.createConfig()),
      );

      const phraseExternalRepository = new ExternalPhraseApiRepository(
        QuotaFactory.createClient(QuotaConfigFactory.createConfig()),
      );

      const cacheRepository = new RedisPersonRepository(
        RedisFactory.getOrCreateClient(RedisConfigFactory.createConfig()),
      );

      const searchPersonByName = new SearchPersonByName(
        personRepository,
        personExternalRepository,
        phraseExternalRepository,
        cacheRepository,
      );
      const response = await searchPersonByName.run(new PersonName(req.query.name || ''));
      return BuildResponse.run(response, res);
    } catch (e: Error | any) {
      console.error('> SearchPerson: ', e);
      return BuildResponse.run(
        { status: e.status || httpStatus.BAD_REQUEST, message: e.message },
        res,
      );
    }
  }
}
