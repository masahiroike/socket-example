import SendMessageByChannel from '../../UseCases/SendMessageByChannel';
import { Channel } from '../../Domain/Models/Channel';
import { Name } from '../../Domain/Models/Name';
import { Message } from '../../Domain/Models/Message';
import FetchFastTalks from '../../UseCases/FetchFastTalks';
import { Talk } from '../../Domain/Models/Talk';
import { StoreReadLimit } from '../../Domain/Models/StoreReadLimit';
import { SendData } from '../../Domain/Models/SendData';
import { Data } from 'ws';
import { Token } from '../../Domain/Models/Token';

export default class SocketController {
  public async default(request: any): Promise<Data[]> {
    SendMessageByChannel.invoke(
      Channel.of(request.channel),
      Token.of(request.token),
      Name.of(request.name),
      Message.of(request.message)
    );
    return [];
  }
  public async init(request: any): Promise<Data[]> {
    return (
      await FetchFastTalks.invoke(
        Channel.of(request.channel),
        StoreReadLimit.of(10)
      )
    ).map((item: Talk) => SendData.ofTalk(item).getData());
  }
}
