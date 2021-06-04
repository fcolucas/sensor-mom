const Stomp = require('stomp');

const producer = data => {
  const client = Stomp.client('ws://localhost:61614/stomp');
  const headers = { login: 'admin', password: 'admin', 'client-id': 'webClient' };

  client.connect(headers, error => {});

  return true;
};

export default producer;
