import { ValueObject } from './ValueObject';
export class StoreReadLimit extends ValueObject<number> {
  public static of(value: number) {
    return new this(value);
  }
}
