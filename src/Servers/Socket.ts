import ws from 'ws';
import http from 'http';
import ErrorHandler from '../Application/Errors/ErrorHandler';
import routes from '../Routers/Socket';
import { SendData } from '../Domain/Models/SendData';
import { Channel } from '../Domain/Models/Channel';
export type RequestMessage = {
  channel: string;
  command: string;
};

class Socket {
  private connections: {
    socket: ws;
    channel: Channel;
  }[] = [];
  private socketServer: ws.Server;
  private async messageHandler(socket: ws, message: ws.Data) {
    try {
      const data: RequestMessage = JSON.parse(message + '');
      if (
        this.connections.filter(item => {
          return (
            item.socket === socket && item.channel.eqByString(data.channel)
          );
        }).length === 0
      ) {
        this.connections.push({
          socket: socket,
          channel: Channel.of(data.channel)
        });
      }
      (
        await Promise.all(
          routes
            .filter(route => route.command === data.command)
            .map(async route => {
              return route.handler(data);
            })
        )
      )
        .flat()
        .forEach(response => {
          socket.send(response);
        });
    } catch (e) {
      new ErrorHandler().error(e);
    }
  }
  private async closeHandler(socket: ws, code: number, reason: string) {
    this.connections = this.connections.filter(item => {
      return item.socket !== socket;
    });
  }
  private connectionHandler(socket: ws, request: http.IncomingMessage) {
    socket.on('message', (message: ws.Data) =>
      this.messageHandler(socket, message)
    );
    socket.on('close', (code: number, reason: string) =>
      this.closeHandler(socket, code, reason)
    );
  }
  public constructor() {
    const httpServer = http.createServer();
    this.socketServer = new ws.Server({ server: httpServer });
    this.socketServer.on(
      'connection',
      (socket: ws, request: http.IncomingMessage) =>
        this.connectionHandler(socket, request)
    );
    httpServer.listen(process.env.PORT);
  }
  public sendByChannel(sendData: SendData) {
    this.connections
      .filter(item => {
        return sendData.getChannel().eq(item.channel);
      })
      .forEach(async item => {
        item.socket.send(sendData.getData());
      });
  }
}

export default new Socket();
