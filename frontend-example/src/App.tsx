import React, { useState } from 'react';
import socket, { channel } from './Socket';
import { useSelector } from "react-redux";

const App = () => {
  const [message, setMessage] = useState('');
  const talks = useSelector(state => state.talk.talks, (a, b) => a.length === b.length)
  return (
    <div>
      <input onChange={(e) => {
        setMessage(e.currentTarget.value);
      }} placeholder="送信するメッセージ" value={message} />
      <button onClick={e => {
        socket.send(JSON.stringify({
          channel,
          token: 'hogehoge',
          message,
          name: '匿名'
        }))
        setMessage('');
      }}>送信</button>
      <ul>
        {talks.map(talk => <li key={talk.time}>{talk.message}</li>)}
      </ul>
    </div>
  );
}

export default App;
