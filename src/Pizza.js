import React from 'react';

const Pizza = ({ name, isGlutenFree, kepURL }) => (
  <React.Fragment>
    <li className="list-group-item">{`${name} ${isGlutenFree}`}</li>
    <li className="list-group-item">
      <center>
        <img src={kepURL} alt={name} width="300" />
      </center>
    </li>
  </React.Fragment>
);

export default Pizza;