const Stomp = require('stompjs');

export const producer = data => {
  const client = Stomp.client('ws://localhost:61614/stomp');
  const headers = { login: 'admin', password: 'admin' };

  const destination = `/topic/${data.tipo}-${data.id}`;

  client.connect(headers, error => {
    if (error.command === 'ERROR') {
      console.error(error.headers.message);
    } else {
      console.log('client connected');
      console.log(client);

      client.send(destination, {}, JSON.stringify(data));
      client.disconnect();
    }
  });
};

export const consumer = () => {
  const client = Stomp.client('ws://localhost:61614/stomp');
  const headers = { login: 'admin', password: 'admin' };

  const destination = '/topic/ActiveMQ.Advisory.Topic';

  client.connect(headers, error => {
    if (error.command === 'ERROR') {
      console.error(error.headers.message);
    } else {
      console.log('client connected');
      console.log(client);

      client.subscribe(destination, (body, headers) => {
        // return JSON.parse(body);
      });
    }
  });
};
