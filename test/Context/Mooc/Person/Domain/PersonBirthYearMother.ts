import { PersonBirthYear } from '../../../../../src/Context/Mooc/Person/Domain/PersonBirthYear';
import { MotherCreator } from '../../../Shared/Domain/MotherCreator';

export class PersonBirthYearMother {
  static create(value: string) {
    return new PersonBirthYear(value);
  }

  static random(): PersonBirthYear {
    const randomNumber = MotherCreator.random().number.int({ min: 10, max: 99 });
    const randomSuffix = MotherCreator.random().helpers.arrayElement(['BBY', 'ABY']); // Elige uno de los sufijos aleatoriamente
    const formattedValue = `${randomNumber}${randomSuffix}`;
    return this.create(formattedValue);
  }

  static invalid(): string {
    return '1998';
  }
}
