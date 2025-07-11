import { CacheRepository } from '../../../../../src/Context/Mooc/Person/Domain/CacheRepository';
import { Person } from '../../../../../src/Context/Mooc/Person/Domain/Person';

export class CacheRepositoryMock implements CacheRepository {
  private readonly findByNameMock = jest.fn();
  private readonly savePersonMock = jest.fn();
  private readonly savePageDataMock = jest.fn();
  private readonly findPageDataMock = jest.fn();

  private person: Person | null = null;
  private persons: Person[] = [];

  constructor() {
    this.findByNameMock = jest.fn();
    this.savePersonMock = jest.fn()
  }

  async findByName(name: string): Promise<string | null> {
    this.findByNameMock(name);
    return this.person ? this.person.toPrimitives() : null;
  }

  async savePerson(name: string, person: Person, expireSeconds?: number): Promise<void> {
    this.savePersonMock(person, expireSeconds);
    this.person = person;
  }

  async savePageData(page: number, perPage: number, personsArray: Person[]): Promise<void> {
    this.savePageDataMock(page, perPage, personsArray);
    this.persons = personsArray;
  }

  async findPageData(page: number, perPage: number): Promise<[] | null> {
    this.findPageDataMock(page, perPage);
    return this.persons.length ? (this.persons as []) : null;
  }

  returnOnFindByName(person: Person | null) {
    return person ? person.toPrimitives(): null
  }

  returnOnFindPageData(persons: Person[]) {
    this.persons = persons;
  }

  assertSavePersonHaveBeenCalledWith(expected: Person): void {
    expect(this.savePersonMock).toHaveBeenCalledWith(expected, expect.anything());
  }

  assertFindByNameHaveBeenCalled(): void {
    expect(this.findByNameMock).toHaveBeenCalled();
  }

  createConnection(): Promise<void> {
    return Promise.resolve(undefined);
  }

  quitConnection(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
