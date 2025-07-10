import { PersonHeight } from '../../../../../src/Context/Mooc/Person/Domain/PersonHeight';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonHeightMother {
  static create(value: string): PersonHeight {
    return new PersonHeight(value);
  }

  static random(): PersonHeight {
    return this.create(
      String(MotherCreator.random().number.float({ min: 10, max: 100, precision: 0.1 })),
    );
  }
}
