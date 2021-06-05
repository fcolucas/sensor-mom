import React, { useEffect, useState } from 'react';
import { consumer } from '../service/broker';
import Stomp from 'stompjs';

const Client = () => {
  //  const body = consumer();
  const [message, setMessage] = useState({});
  const [topic, setTopic] = useState('');

  const destinations = JSON.parse(localStorage.getItem('listSensor'));

  useEffect(() => {
    if (topic) {
      const client = Stomp.client('ws://localhost:61614/stomp');
      const headers = { login: 'admin', password: 'admin' };

      client.connect(headers, error => {
        if (error.command === 'ERROR') {
          console.error(error.headers.message);
        } else {
          console.log('client connected');

          client.subscribe(`/topic/${topic}`, (message, headers) => {
            const msg = JSON.parse(message.body);
            console.log(msg);
            setMessage({ message: msg.message, value: msg.value });
          });
        }
      });
    }
  }, [topic]);

  return (
    <div>
      <h1>Lista de tópicos:</h1>
      <ul>
        {destinations.map((destination, index) => (
          <li key={index} onClick={() => setTopic(destination)}>
            {destination}
          </li>
        ))}
      </ul>

      <div>
        {message ? (
          <div>
            <p>{message.message}</p>
            <p>{message.value}</p>
          </div>
        ) : (
          <p>Aguardando nova mensagem</p>
        )}
      </div>
    </div>
  );
};

export default Client;
