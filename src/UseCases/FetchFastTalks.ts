import TalkInterface from '../Domain/Models/TalkInterface';
import TalkRepository from '../Infrastructure/Repositories/TalkRepository';
import { StoreReadLimit } from '../Domain/Models/StoreReadLimit';
import { Channel } from '../Domain/Models/Channel';
import TalkMock from '../Infrastructure/Mocks/TalkMock';

/**
 * 新しい会話を指定数取得する
 */
class UseCase {
  public constructor(private talkRepository: TalkInterface) {}
  public invoke(channel: Channel, limit: StoreReadLimit) {
    return this.talkRepository.findAllLatestByChannel(channel, limit);
  }
}

export default new UseCase(
  process.env.NODE_ENV === 'production' ? new TalkRepository() : TalkMock
);
