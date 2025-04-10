import React from 'react';
import { Button } from 'react-bootstrap';

const WeatherButton = ({ cities, setCity }) => {
  return (
    <div>
      <Button variant="light" onClick={() => setCity('')}>
        Current Location
      </Button>
      {cities.map((item, index) => (
        <Button
          variant="light"
          key={index}
          onClick={() => setCity(item)}
          style={{ margin: '0 5px' }}
        >
          {item}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
