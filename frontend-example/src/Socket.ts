import ReconnectingWebSocket from "reconnecting-websocket";
import store from "./stores";
import { setTalk } from "./stores/talk";

export type Request = {};

export const channel = 'channel-hogehoge'

const socket: ReconnectingWebSocket = new ReconnectingWebSocket(
  process.env.REACT_APP_SOCKET_SERVER_URI!,
  [],
  {
    WebSocket: WebSocket,
    connectionTimeout: 5000,
    maxRetries: 10
  }
);

socket.addEventListener("message", event => {
  try {
    store.dispatch(setTalk(event.data))
  } catch (e) {
    console.error(e)
  }
});

socket.addEventListener("error", event => {
  console.error(event)
});

socket.addEventListener("close", event => {
  console.info(event.reason);
});

socket.addEventListener("open", event => {
  socket.send(
    JSON.stringify({
      command: "init",
      channel: channel
    })
  );
});

export default socket;
