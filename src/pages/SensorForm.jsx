import React, { useState } from 'react';
import { producer } from '../service/broker';

const SensorForm = () => {
  const [tipo, setTipo] = useState('');
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [value, setValue] = useState('');
  const [id, setId] = useState(0);
  const [sensor, setSensor] = useState(false);

  const saveTopic = topic => {
    const listSensor = localStorage.getItem('listSensor')
      ? JSON.parse(localStorage.getItem('listSensor'))
      : [];

    if (!listSensor.includes(topic)) {
      listSensor.push(topic);
      localStorage.setItem('listSensor', JSON.stringify(listSensor));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (Number(max) < Number(min)) {
      alert('O valor máximo deve ser maior que o valor mínimo');
    } else {
      const idSensor =
        localStorage.getItem('idSensor') && localStorage.getItem('idSensor').length
          ? Number(localStorage.getItem('idSensor')) + 1
          : 0;

      console.log(idSensor);
      setId(idSensor);

      localStorage.setItem('idSensor', `${idSensor}`);

      saveTopic(`${tipo}-${idSensor}`);
      setSensor(true);
    }
  };

  const handleValue = e => {
    e.preventDefault();

    if (value > max || value < min) {
      producer({
        id,
        tipo,
        value,
        message: value > max ? 'O valor está alto' : 'O valor está baixo',
      });
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
