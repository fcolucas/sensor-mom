import React, { useState } from 'react';
import { producer } from '../service/broker';

import './SensorForm.css';

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

  return (
    <div className="sensor">
      {sensor ? (
        <form onSubmit={handleValue}>
          <label>{`Digite o valor da ${tipo}`}</label>
          <input
            type="text"
            name="value"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className="button-submit" type="submit">
            <span>Enviar</span>
          </button>
        </form>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="radio-group">
            <span className="title">Defina o tipo de sensor:</span>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="temperatura"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Temperatura</label>
            </div>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="umidade"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Umidade</label>
            </div>
            <div className="radio-group-item">
              <input
                type="radio"
                name="tipo"
                value="velocidade"
                onChange={e => setTipo(e.target.value)}
              />
              <label>Velocidade</label>
            </div>
          </div>

          <div className="field-group">
            <span className="title">Defina os valores:</span>
            <div className="form-field">
              <label>Mínimo:</label>
              <input
                type="text"
                name="min"
                value={min}
                onChange={e => setMin(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label>Máximo:</label>
              <input
                type="text"
                name="max"
                value={max}
                onChange={e => setMax(e.target.value)}
              />
            </div>
          </div>

          <button className="button-submit" type="submit">
            <span>Enviar</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default SensorForm;
