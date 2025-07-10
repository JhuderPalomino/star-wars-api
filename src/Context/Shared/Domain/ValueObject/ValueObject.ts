import { InvalidArgumentError } from './InvalidArgument';

export type Primitives = string | number | boolean | Date;

export abstract class ValueObject<T extends Primitives> {
  readonly value: T;
  nameAttribute: string;

  protected constructor(value: T, isRequired: boolean = true, name: string = 'default') {
    this.value = value;
    this.nameAttribute = name;
    isRequired && this.ensureValueIsDefined(value);
  }

  private ensureValueIsDefined(value: T): void {
    if (value === null || value === undefined) {
      throw new InvalidArgumentError(`El campo ${this.nameAttribute} no puede ser vacio`);
    }
  }

  toString(): string {
    return this.value.toString();
  }
}
