import { ValueObject } from './ValueObject';
/**
 * トークン
 */
export class Token extends ValueObject<string> {
  public static of(value: string) {
    return new this(value);
  }
}
