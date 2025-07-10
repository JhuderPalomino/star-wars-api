import { MotherCreator } from '../../../Shared/Domain/MotherCreator';
import { PersonEdited } from '../../../../../src/Context/Mooc/Person/Domain/PersonEdited';

export class PersonEditedMother {
  static create(value: string): PersonEdited {
    return new PersonEdited(value);
  }

  static random(): PersonEdited {
    const date = MotherCreator.random().date.recent(); // Genera una fecha reciente aleatoria
    const formattedDate = date.toISOString(); // Formatea la fecha en formato ISO 8601

    return this.create(formattedDate);
  }
}
