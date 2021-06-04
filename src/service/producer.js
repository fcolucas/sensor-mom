const Stomp = require('stompjs');

const producer = data => {
  const client = Stomp.client('ws://localhost:61614/stomp');
  const headers = { login: 'admin', password: 'admin', 'client-id': 'webClient' };

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

  return true;
};

export default producer;
