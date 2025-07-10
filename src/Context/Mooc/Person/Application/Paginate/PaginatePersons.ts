import { DataBaseRepository } from '../../Domain/DataBaseRepository';

export class PaginatePersons {
  constructor(
    private readonly personRepository: DataBaseRepository,
  ) {}

  async run(page: number, perPage: number) {
    const personsFound = await this.personRepository.findAll(page, perPage);

    if (personsFound) {
      return {
        data: personsFound.map(person => person.toPrimitivesSpanish()),
        page: page,
        perPage: perPage,
        total: personsFound.length
      };

    }
    return {
      data: [],
      page: page,
      perPage: perPage,
      total: 0
    };
  }
}
