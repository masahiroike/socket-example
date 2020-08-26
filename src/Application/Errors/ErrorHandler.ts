import Socket from '../../Servers/Socket';
import { Talk } from '../../Domain/Models/Talk';
import { Message } from '../../Domain/Models/Message';
import { Name } from '../../Domain/Models/Name';
import { Channel } from '../../Domain/Models/Channel';
import { SendData } from '../../Domain/Models/SendData';

export default class ErrorHandler {
  public error(e: Error) {
    Socket.sendByChannel(
      SendData.ofTalk(
        Talk.of(
          Message.of(e.message),
          Name.of('errorHandler'),
          Channel.of('c2036ea4-cc6a-4142-87cb-cbd5ed4b8c82')
        )
      )
    );
    console.error(e);
  }
}
