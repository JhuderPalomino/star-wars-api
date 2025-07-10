import { ExternalApiRepository } from '../../../../../src/Context/Mooc/Person/Domain/ExternalApiRepository';
import { PersonName } from '../../../../../src/Context/Mooc/Person/Domain/PersonName';
import { Person } from '../../../../../src/Context/Mooc/Person/Domain/Person';

export class ExternalApiRepositoryMock implements ExternalApiRepository {
  private readonly findByNameMock: jest.Mock;
  private person: Person | null;

  constructor() {
    this.findByNameMock = jest.fn();
  }

  async findByName(name: PersonName): Promise<Person | null> {
    this.findByNameMock(name);
    return this.person;
  }

  returnOnFindByName(person: Person | null) {
    this.person = person;
  }
}
