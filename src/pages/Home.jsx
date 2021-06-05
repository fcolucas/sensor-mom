import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <Link to={'/sensor'}>
        <button className="button-sensor">
          <span>Sensor</span>
        </button>
      </Link>
      <Link to={'/client'}>
        <button className="button-client">
          <span>Cliente</span>
        </button>
      </Link>
    </div>
  );
};

export default Home;
