import { Message } from './Message';
import { Name } from './Name';
import { Id } from './Id';
import { Channel } from './Channel';
import { Time } from './Time';

export class Talk {
  private constructor(
    private message: Message,
    private name: Name,
    private time: Time,
    private channel: Channel,
    private id?: Id
  ) {}
  public static of(message: Message, name: Name, channel: Channel) {
    return new this(message, name, Time.of(new Date()), channel);
  }
  public hasId() {
    return this.id !== undefined;
  }
  public toObject(): typeof Talk['ofObject'] extends (obj: infer T) => any
    ? T | Omit<T, 'id'>
    : never {
    return {
      message: this.message.get(),
      name: this.name.get(),
      time: this.time.get(),
      id: this.hasId() ? (this.id as Id).get() : undefined,
      channel: this.channel.get()
    };
  }
  public static ofObject(obj: {
    message: string;
    name: string;
    time: Date;
    id: number;
    channel: string;
  }) {
    return new this(
      Message.of(obj.message),
      Name.of(obj.name),
      Time.of(obj.time),
      Channel.of(obj.channel),
      Id.of(obj.id)
    );
  }
  public getChannel() {
    return this.channel;
  }
  public toString() {
    return JSON.stringify(this.toObject());
  }
}
