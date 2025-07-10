import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonName extends StringValueObject {
  readonly value: string;
  readonly regexName: RegExp = /^[A-Za-z]+$/;

  constructor(value: string) {
    super(value, true, 'nombre');
    this.ensureOnlyLetters(value);
  }

  private replaceSpaceCharacter(input: string): string {
    return input.replace(/\s/g, '');
  }

  private ensureOnlyLetters(input: string) {
    const valueAux = this.replaceSpaceCharacter(input);
    const response = this.regexName.test(valueAux);

    if (!response) {
      throw new InvalidArgumentError(
        `El formato del campo ${this.nameAttribute} tiene que ser solo letras.`,
      );
    }
  }
}
