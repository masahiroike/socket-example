import SocketController from '../Application/Controllers/SocketController';
import { Data } from 'ws';

type Route = {
  command?: string;
  handler: (message: { [key: string]: any }) => Promise<Data[]>;
};

const routes: Route[] = [
  {
    command: 'init',
    handler: new SocketController().init
  },
  {
    command: undefined,
    handler: new SocketController().default
  }
];

export default routes;
