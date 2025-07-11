import { DatabaseRepository } from '../Domain/DatabaseRepository';
import { PersonApiRepository } from '../Domain/PersonApiRepository';
import { PersonName } from '../Domain/PersonName';
import { PersonNotFoundException } from '../Domain/PersonNotFoundException';
import { CacheRepository } from '../Domain/CacheRepository';

export class SearchPersonByName {
  constructor(
    private readonly personRepository: DatabaseRepository,
    private readonly apiRepository: PersonApiRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async run(name: PersonName) {
    await this.cacheRepository.createConnection();

    try {
      const personFoundInCache = await this.cacheRepository.findByName(name.value);
      if (personFoundInCache) {
        console.log(`> Retornando ${name.value} de cache`);
        return personFoundInCache;
      }
      const personFound = await this.personRepository.findByName(name);

      if (personFound) {
        console.log(`> Retornando ${name.value} de base de datos`);
        await this.cacheRepository.savePerson(personFound, 30 * 60);
        return personFound.toPrimitives();
      }

      const personApi = await this.apiRepository.findByName(name);

      if (!personApi && !personFound) {
        throw new PersonNotFoundException('El personaje no ha sido encontrado');
      }

      personApi && (await this.personRepository.save(personApi));

      return personApi?.toPrimitives();
    } finally {
      await this.cacheRepository.quitConnection();
    }
  }
}
