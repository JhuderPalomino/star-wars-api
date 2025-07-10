import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonHeight extends StringValueObject {
  constructor(value: string) {
    super(value, true, 'altura');
    this.ensureFormatHeight(value);
  }

  private ensureFormatHeight(input: string) {
    const numericValue = parseFloat(input);

    if (isNaN(numericValue)) {
      throw new InvalidArgumentError(
        `Formato para el campo ${this.nameAttribute} es incorrecto solo se acepta números`,
      );
    }
  }
}
