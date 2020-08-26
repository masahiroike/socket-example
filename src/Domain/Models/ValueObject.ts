export abstract class ValueObject<T> {
  protected constructor(protected value: T) {}
  public get() {
    return this.value;
  }
  public eq(valueObject: ValueObject<T>): boolean {
    return valueObject.get() === this.value;
  }
}
