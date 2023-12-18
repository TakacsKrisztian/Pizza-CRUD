import React, { useState, useEffect } from 'react';

const PizzaComponent = () => {
  const [state, setState] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPizza] = useState({
    id: 1,
    name: 'Négysajtos pizza',
    isGlutenFree: 0,
    kepURL:
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fparkpizza.hu%2Fwp-content%2Fuploads%2F2018%2F05%2FN%25C3%25A9gysajtos-pizza.jpg&f=1&nofb=1&ipt=aec291f02b2c6cf7c3a0903b03b44b9dcba4f470587e554552ee50eb71d7f896&ipo=images',
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://pizza.kando-dev.eu/Pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPizza),
      });
      if (!response.ok) {
        throw new Error('Login hiba!');
      }
      await readPizza();
    } catch (error) {
      console.log(error);
    }
  };

  const readPizza = async () => {
    try {
      const response = await fetch('https://pizza.kando-dev.eu/Pizza');
      if (!response.ok) {
        throw new Error('Pizza hiba!');
      }
      const pizzaPage = await response.json();
      setState(pizzaPage.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readPizza();
  }, []);

  const renderPizza = () => {
    if (!state || state.length === 0) {
      return <p>Nincs megjeleníthető pizza</p>;
    }
  
    return state.map((pizza) => (
      <React.Fragment key={pizza.id}>
        <li className="list-group-item">{`${pizza.name} ${pizza.isGlutenFree}`}</li>
        <li className="list-group-item">
          <center>
            <img src={pizza.kepURL} alt={pizza.name} width="300" />
          </center>
        </li>
      </React.Fragment>
    ));
  };
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label>
          Jelszó:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Bejelentkezés</button>
      </form>
      <div id="user-lista-container">
        <ul className="list-group">{renderPizza()}</ul>
      </div>
    </div>
  );
};

export default PizzaComponent;