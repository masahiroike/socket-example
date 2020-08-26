import { ValueObject } from './ValueObject';
export class Name extends ValueObject<string> {
  public static of(value: string) {
    return new this(value);
  }
}
