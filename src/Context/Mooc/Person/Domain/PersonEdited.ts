import { StringValueObject } from '../../../Shared/Domain/ValueObject/StringValueObject';
import { InvalidArgumentError } from '../../../Shared/Domain/ValueObject/InvalidArgument';

export class PersonEdited extends StringValueObject {
  readonly regexDate: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

  constructor(value: string) {
    super(value, true, 'fecha_actualización');
    this.ensureFormatDate(value);
  }

  private ensureFormatDate(input: string) {
    const inputString = new Date(input).toISOString();
    const response = this.regexDate.test(inputString);
    if (!response) {
      throw new InvalidArgumentError(`Formato del campo ${this.nameAttribute} es invalida`);
    }
  }
}
