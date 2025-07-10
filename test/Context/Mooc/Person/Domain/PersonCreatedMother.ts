import { PersonCreated } from '../../../../../src/Context/Mooc/Person/Domain/PersonCreated';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonCreatedMother {
  static create(value: string): PersonCreated {
    return new PersonCreated(value);
  }

  static random(): PersonCreated {
    const date = MotherCreator.random().date.recent(); // Genera una fecha reciente aleatoria
    const formattedDate = date.toISOString(); // Formatea la fecha en formato ISO 8601

    return this.create(formattedDate);
  }
}
