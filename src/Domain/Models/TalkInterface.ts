import { Talk } from './Talk';
import { Channel } from './Channel';
import { StoreReadLimit } from './StoreReadLimit';
export default interface TalkInterface {
  findAllLatestByChannel(
    channel: Channel,
    limit: StoreReadLimit
  ): Promise<Talk[]>;
  store(talk: Talk): Promise<Talk>;
}
