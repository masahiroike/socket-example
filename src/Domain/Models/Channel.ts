import { ValueObject } from './ValueObject';
export class Channel extends ValueObject<string> {
  public eqByString(channel: string): boolean {
    return channel === this.value;
  }
  public static of(value: string) {
    return new this(value);
  }
}
