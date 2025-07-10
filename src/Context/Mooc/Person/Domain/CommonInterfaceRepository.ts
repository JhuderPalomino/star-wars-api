import { Person } from './Person';
import { PersonName } from './PersonName';

export interface CommonInterfaceRepository {
  save(person: Person): Promise<void>;
  findByName(name: PersonName): Promise<Person | null>;
  findAll(page: number, perPage: number): Promise<Person[]>;
}
