import { Person } from './Person';
import { PersonName } from './PersonName';

export interface PersonApiRepository {
  findByName(name: PersonName): Promise<Person | null>;
}
