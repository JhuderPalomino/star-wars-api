import { Person } from './Person';

export interface CacheRepository {
  createConnection(): Promise<void>;
  quitConnection(): Promise<void>;
  findByName(name: string): Promise<string | null>;
  savePerson(person: Person, expireSeconds?: number): Promise<void>;
  savePageData(page: number, perPage: number, personsArray: Person[]): Promise<void>;
  findPageData(page: number, perPage: number): Promise<[] | null>;
}
