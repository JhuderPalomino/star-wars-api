import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonMass extends StringValueObject {

  readonly regexMass: RegExp = /^(unknown|\d+([.,]\d+)?)$/;
  constructor(value: string) {
    super(value, true, 'masa');
    this.ensureFormatMass(value);
  }

  private ensureFormatMass(input: string) {

    const response = this.regexMass.test(input)

    if (!response) {
      throw new InvalidArgumentError(
        `Formato para el campo ${this.nameAttribute} es incorrecto solo se acepta [números, unknown]`,
      );
    }
  }
}
