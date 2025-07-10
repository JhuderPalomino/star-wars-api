import { Person } from './Person';
import { PersonName } from './PersonName';

export interface ExternalApiRepository {
  findByName(name: PersonName): Promise<Person | null>;
}
