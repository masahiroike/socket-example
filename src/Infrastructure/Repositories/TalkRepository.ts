import { Talk } from '../../Domain/Models/Talk';
import TalkInterface from '../../Domain/Models/TalkInterface';
import { StoreReadLimit } from '../../Domain/Models/StoreReadLimit';
import { Channel } from '../../Domain/Models/Channel';
import { TalkModel } from 'src/Models/TalkModel';
export default class TalkRepository implements TalkInterface {
  public async findAllLatestByChannel(
    channel: Channel,
    limit: StoreReadLimit
  ): Promise<Talk[]> {
    const data = await TalkModel.find({
      order: {
        createdAt: 'DESC'
      },
      take: limit.get(),
      where: {
        channel: channel.get()
      }
    });
    return data.map(item => item.toDomain());
  }
  public async store(entity: Talk) {
    const object = await TalkModel.ofDomain(entity).save();
    return object.toDomain();
  }
}
