import { PersonMass } from '../../../../../src/Context/Mooc/Person/Domain/PersonMass';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonMassMother {
  static create(value: string): PersonMass {
    return new PersonMass(value);
  }

  static random() {
    return this.create(
      String(MotherCreator.random().number.float({ min: 10, max: 100, precision: 0.01 })),
    );
  }
}
