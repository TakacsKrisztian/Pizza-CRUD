import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const PizzaComponent = () => {
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({
    id: 0,
    name: '',
    isGlutenFree: 0,
    kepURL: '',
  });

  const renderPizzas = () => {
    if (!pizzas) {
      return <p>Betöltés...</p>;
    }

    if (pizzas.length === 0) {
      return <p>Nincs pizza.</p>;
    }
    };
  const fetchPizzas = async () => {
    try {
      const response = await fetch('https://pizza.kando-dev.eu/Pizza');
      if (!response.ok) {
        throw new Error('Failed to fetch pizzas');
      }

      const pizzaPage = await response.json();
      console.log('Pizzas:', pizzaPage);
      setPizzas(pizzaPage.data);
    } catch (error) {
      console.error('Error fetching pizzas:', error.message);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const addPizza = async () => {
    try {
      const response = await fetch('https://pizza.kando-dev.eu/Pizza', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPizza),
      });

      if (!response.ok) {
        throw new Error('Failed to add pizza');
      }

      fetchPizzas();
    } catch (error) {
      console.error('Error adding pizza:', error.message);
    }
  };

  const updatePizza = async (id, updatedPizza) => {
    try {
      const response = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPizza),
      });

      if (!response.ok) {
        throw new Error('Failed to update pizza');
      }

      fetchPizzas();
    } catch (error) {
      console.error('Error updating pizza:', error.message);
    }
  };

  const deletePizza = async (id) => {
    try {
      const response = await fetch(`https://pizza.kando-dev.eu/Pizza/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pizza');
      }

      fetchPizzas();
    } catch (error) {
      console.error('Error deleting pizza:', error.message);
    }
  };

  const handleAddPizza = () => {
    addPizza();
    setNewPizza({
      id: 0,
      name: '',
      isGlutenFree: 0,
      kepURL: '',
    });
  };

  const handleUpdatePizza = (id, updatedPizza) => {
    updatePizza(id, updatedPizza);
  };

  const handleDeletePizza = (id) => {
    deletePizza(id);
  };

  return (
    <div>
      <h1>Pizza lista:</h1>
      {renderPizzas()}
      <div>
        <h2>Pizza hozzáadása</h2>
        <label>
          Név:
          <input
            type="text"
            value={newPizza.name}
            onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
          />
        </label>
        <br />
        <label>
          Gluténmentes-e:
          <input
            type="checkbox"
            checked={newPizza.isGlutenFree}
            onChange={(e) =>
              setNewPizza({ ...newPizza, isGlutenFree: e.target.checked ? 1 : 0 })
            }
          />
        </label>
        <br />
        <label>
          Kép URL:
          <input
            type="text"
            value={newPizza.kepURL}
            onChange={(e) => setNewPizza({ ...newPizza, kepURL: e.target.value })}
          />
        </label>
        <br />
        <button onClick={handleAddPizza}>Pizza hozzáadása</button>
      </div>
    </div>
  );
};

export default PizzaComponent;