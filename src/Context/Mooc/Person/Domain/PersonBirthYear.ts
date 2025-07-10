import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonBirthYear extends StringValueObject {
  readonly regexBirthYear: RegExp = /^(\d+(\.\d+)?\s*(BBY|ABY)|unknown)$/;

  constructor(value: string) {
    super(value, true, 'año_nacimiento');
    this.ensureFormatBirthYear(value);
  }

  private ensureFormatBirthYear(input: string) {
    const valueAux = this.replaceSpaceCharacter(input);
    const response = this.regexBirthYear.test(valueAux);

    if (!response) {
      throw new InvalidArgumentError(
        `El campo ${this.nameAttribute} tiene que tener el formato [xxBBY, xxABY, unknown]`,
      );
    }
  }

  private replaceSpaceCharacter(input: string): string {
    return input.replace(/\s/g, '');
  }
}
