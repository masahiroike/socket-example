import { Channel } from '../Domain/Models/Channel';
import { Name } from '../Domain/Models/Name';
import { Message } from '../Domain/Models/Message';
import { ClientInterface } from '../Domain/Models/ClientInterface';
import { UserInfo } from '../Domain/Models/UserInfo';
import ChannelRepository from '../Infrastructure/Repositories/ChannelRepository';
import { Talk } from '../Domain/Models/Talk';
import TalkInterface from '../Domain/Models/TalkInterface';
import TalkRepository from '../Infrastructure/Repositories/TalkRepository';
import TalkMock from '../Infrastructure/Mocks/TalkMock';
import { SendData } from '../Domain/Models/SendData';
import { Token } from '../Domain/Models/Token';

/**
 * チャンネルにメッセージを送信する。
 * 送信が成功したら、データを永続化する
 */
class UseCase {
  public constructor(
    private clientRepository: ClientInterface,
    private talkRepository: TalkInterface
  ) {}
  public async invoke(
    channel: Channel,
    token: Token,
    name: Name,
    message: Message
  ) {
    const userInfo = UserInfo.of(token, name);
    const talk = Talk.of(message, userInfo.getName(), channel);
    this.clientRepository.send(SendData.ofTalk(talk));
    this.talkRepository.store(talk);
  }
}

export default new UseCase(
  new ChannelRepository(),
  process.env.NODE_ENV === 'development' ? TalkMock : new TalkRepository()
);
