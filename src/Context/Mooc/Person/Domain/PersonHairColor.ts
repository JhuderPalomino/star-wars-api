import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonHairColor extends StringValueObject {
  readonly regexHairColor: RegExp = /^(unknown|n\/a|[A-Za-z]+([,\s]+[A-Za-z]+)*)$/;

  constructor(value: string) {
    super(value, true, 'color_cabello');
    this.ensureFormatHairColor(value);
  }

  private ensureFormatHairColor(input: string) {
    const response = this.regexHairColor.test(input);
    if (!response) {
      throw new InvalidArgumentError(`Formato de campo ${this.nameAttribute} es incorrecto`);
    }
  }
}
