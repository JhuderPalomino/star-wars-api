import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonEyeColor extends StringValueObject {
  readonly regexEyeColor: RegExp = /^[A-Za-z/]+$/;

  constructor(value: string) {
    super(value, true, 'color_ojos');
    this.ensureOnlyLettersAndSlash(value);
  }

  private ensureOnlyLettersAndSlash(input: string) {
    const valueAux = this.replaceSpaceCharacter(input);
    const response = this.regexEyeColor.test(valueAux);

    if (!response) {
      throw new InvalidArgumentError(
        `El formato del campo ${this.nameAttribute} tiene que ser solo letras.`,
      );
    }
  }

  private replaceSpaceCharacter(input: string): string {
    return input.replace(/\s/g, '');
  }
}
