import { Talk } from '../../Domain/Models/Talk';
import TalkInterface from '../../Domain/Models/TalkInterface';
import { StoreReadLimit } from '../../Domain/Models/StoreReadLimit';
import { Channel } from '../../Domain/Models/Channel';
import { Message } from '../../Domain/Models/Message';
import { Name } from '../../Domain/Models/Name';
class TalkMock implements TalkInterface {
  private talks: Talk[] = [
    Talk.of(
      Message.of('message'),
      Name.of('mock'),
      Channel.of('c2036ea4-cc6a-4142-87cb-cbd5ed4b8c82')
    )
  ];
  public async findAllLatestByChannel(
    channel: Channel,
    limit: StoreReadLimit
  ): Promise<Talk[]> {
    return this.talks.filter(talk => talk.getChannel().eq(channel));
  }
  public async store(talk: Talk) {
    const newTalk = Talk.ofObject({
      ...talk.toObject(),
      id: this.talks.length
    });
    this.talks.push(newTalk);
    return newTalk;
  }
}

export default new TalkMock();
