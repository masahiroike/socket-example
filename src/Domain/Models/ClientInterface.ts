import { SendData } from './SendData';

export interface ClientInterface {
  send(sendData: SendData): void;
}
