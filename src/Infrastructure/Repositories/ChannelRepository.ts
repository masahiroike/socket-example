import Socket from '../../Servers/Socket';
import { ClientInterface } from '../../Domain/Models/ClientInterface';
import { SendData } from '../../Domain/Models/SendData';
export default class ChannelRepository implements ClientInterface {
  public send(sendData: SendData) {
    Socket.sendByChannel(sendData);
  }
}
