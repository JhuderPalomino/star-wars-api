import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonGender extends StringValueObject {
  readonly regexGender: RegExp = /^(male|female|hermaphrodite|unknown|n\/a)$/i;

  constructor(value: string) {
    super(value, true, 'genero');
    this.ensureFormatGender(value);
  }

  private ensureFormatGender(input: string) {
    const response = this.regexGender.test(input);

    if (!response) {
      throw new InvalidArgumentError(
        `Formato del campo ${this.nameAttribute} es incorrecto solo se permite [male, female, hermaphrodite, unknown, n/a]`,
      );
    }
  }
}
