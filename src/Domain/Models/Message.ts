import { ValueObject } from './ValueObject';
export class Message extends ValueObject<string> {
  public static of(value: string) {
    return new this(value);
  }
}
