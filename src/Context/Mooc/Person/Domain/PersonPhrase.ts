import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonPhrase extends StringValueObject {
  readonly value: string;
  readonly regexName: RegExp = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9.,'’"!?()\-:; ]+$/;

  constructor(value: string) {
    super(value, false, 'frase');
    this.ensureOnlyLetters(value ?? '');
  }

  private ensureOnlyLetters(input: string) {
    const response = this.regexName.test(input);

    if (input.length === 0) {
      return;
    }

    if (!response) {
      throw new InvalidArgumentError(
        `El formato del campo ${this.nameAttribute} tiene que ser solo letras.`,
      );
    }
  }
}
