import { Id } from './Id';
import { Name } from './Name';
import { Token } from './Token';

export class UserInfo {
  private constructor(
    private name: Name,
    private token: Token,
    private id?: Id
  ) {}
  public static of(name: Name, token: Token) {
    return new this(name, token);
  }
  public hasId() {
    return this.id !== undefined;
  }
  public toObject(): typeof UserInfo['ofObject'] extends (obj: infer T) => any
    ? T | Omit<T, 'id'>
    : never {
    return {
      name: this.name.get(),
      token: this.token.get()
    };
  }
  public static ofObject(obj: { name: string; token: string; id: number }) {
    return new this(Name.of(obj.name), Name.of(obj.name), Id.of(obj.id));
  }
  public getName(): Name {
    return this.name;
  }
}
