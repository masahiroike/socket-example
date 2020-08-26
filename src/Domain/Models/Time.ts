import { ValueObject } from './ValueObject';
export class Time extends ValueObject<Date> {
  public static of(value: Date) {
    return new this(value);
  }
}
