import { CacheRepository } from '../Domain/CacheRepository';
import { DatabaseRepository } from '../Domain/DatabaseRepository';

export class PaginatePersons {
  constructor(
    private readonly personRepository: DatabaseRepository,
    private readonly cacheRepository: CacheRepository,
  ) {}

  async run(page: number, perPage: number) {
    const personsFound = await this.personRepository.findAll(page, perPage);

    if (personsFound) {
      return {
        data: personsFound.map((person) => person.toPrimitives()),
        page: page,
        perPage: perPage,
        total: personsFound.length,
      };
    }
    return {
      data: [],
      page: page,
      perPage: perPage,
      total: 0,
    };
  }
}
