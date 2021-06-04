import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to={'/sensor'}>
        <button>Sensor</button>
      </Link>
      <Link to={'/client'}>
        <button>Cliente</button>
      </Link>
    </div>
  );
};

export default Home;
