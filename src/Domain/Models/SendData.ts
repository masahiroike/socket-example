import { Channel } from './Channel';
import { Data } from 'ws';
import { Talk } from './Talk';

export class SendData {
  private constructor(private channel: Channel, private data: Data) {}
  public static of(channel: Channel, data: Data) {
    return new this(channel, data);
  }
  public getChannel() {
    return this.channel;
  }
  public getData() {
    return this.data;
  }
  public static ofTalk(talk: Talk) {
    return new this(talk.getChannel(), talk.toString());
  }
}
