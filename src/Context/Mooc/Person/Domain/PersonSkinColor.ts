import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonSkinColor extends StringValueObject {
  readonly regexString: RegExp = /^[A-Za-z\s\-,]+$/;

  constructor(value: string) {
    super(value, true, 'color_piel');
    this.ensureOnlyLetters(value);
  }

  private replaceSpaceCharacter(input: string): string {
    return input.replace(/\s/g, '');
  }

  private ensureOnlyLetters(input: string) {
    const valueAux = this.replaceSpaceCharacter(input);
    const response = this.regexString.test(valueAux);

    if (!response) {
      throw new InvalidArgumentError(
        `El formato del campo ${this.nameAttribute} tiene que ser solo letras.`,
      );
    }
  }
}
