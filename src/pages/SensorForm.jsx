import React, { useState } from 'react';
import producer from '../service/producer';

const SensorForm = () => {
  const [tipo, setTipo] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [value, setValue] = useState('');
  const [id, setId] = useState(0);
  const [sensor, setSensor] = useState(false);

  const saveTopic = topic => {
    const listTopics = localStorage.getItem('listStorage')
      ? JSON.parse(localStorage.getItem('listStorage'))
      : [];

    if (!listTopics.includes(topic)) {
      listTopics.push(topic);
      localStorage.setItem('listStorage', JSON.stringify(listTopics));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const idSensor = localStorage.getItem('idSensor');

    setId(idSensor ? Number(idSensor) + 1 : 0);
    localStorage.setItem('idSensor', id.toString());

    saveTopic(`${tipo}-${id}`);
    setSensor(true);
  };

  const handleValue = e => {
    e.preventDefault();
    const ok = producer({ id, tipo, max, min, value });

    if (ok) {
      console.log('ok');
    }
  };

  return sensor ? (
    <div>
      <form onSubmit={handleValue}>
        <label>{`Digite o valor da ${tipo}`}</label>
        <input
          type="text"
          name="value"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Defina o tipo de sensor:</h1>
          <input
            type="radio"
            name="tipo"
            value="temperatura"
            onChange={e => setTipo(e.target.value)}
          />
          <label>Temperatura</label>
          <input
            type="radio"
            name="tipo"
            value="umidade"
            onChange={e => setTipo(e.target.value)}
          />
          <label>Umidade</label>
          <input
            type="radio"
            name="tipo"
            value="velocidade"
            onChange={e => setTipo(e.target.value)}
          />
          <label>Velocidade</label>
        </div>

        <div>
          <h1>Defina os valores:</h1>
          <label>Mínimo:</label>
          <input
            type="text"
            name="min"
            value={min}
            onChange={e => setMin(e.target.value)}
          />
          <label>Máximo:</label>
          <input
            type="text"
            name="max"
            value={max}
            onChange={e => setMax(e.target.value)}
          />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default SensorForm;
