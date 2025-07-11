import { DatabaseRepository } from '../../../../../src/Context/Mooc/Person/Domain/DatabaseRepository';
import { Person } from '../../../../../src/Context/Mooc/Person/Domain/Person';
import { PersonName } from '../../../../../src/Context/Mooc/Person/Domain/PersonName';

export class PersonRepositoryMock implements DatabaseRepository {
  private readonly saveMock: jest.Mock;
  private readonly findByNameMock: jest.Mock;
  private readonly findAllMock: jest.Mock;
  private person: Person | null;

  constructor() {
    this.findByNameMock = jest.fn();
    this.saveMock = jest.fn();
  }

  async findByName(name: PersonName): Promise<Person | null> {
    this.findByNameMock(name);
    return this.person;
  }

  async save(person: Person): Promise<void> {
    this.saveMock(person);
  }

  async findAll(page: number, perPage: number): Promise<Person[]> {
    this.findAllMock(page, perPage);
    return [];
  }

  returnOnFindByName(person: Person | null) {
    this.person = person;
  }

  assertSaveHaveBeenCalledWith(expected: Person): void {
    expect(this.saveMock).toHaveBeenCalledWith(expected);
  }

  assertFindByName() {
    expect(this.findByNameMock).toHaveBeenCalled();
  }
}
