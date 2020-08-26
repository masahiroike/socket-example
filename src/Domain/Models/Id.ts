import { ValueObject } from './ValueObject';

/**
 * データの管理番号
 */
export class Id extends ValueObject<number> {
  public static of(value: number) {
    return new this(value);
  }
}
