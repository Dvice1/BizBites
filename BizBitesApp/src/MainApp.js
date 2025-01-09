import React, { useState } from 'react';
import './App.css';

function App() {
  const [deals, setDeals] = useState([]);
  const [meals, setMeals] = useState([]);
  const [deliveries, setDeliveries] = useState([]);

  const handleDealChange = (event) => {
    const newDeals = [...deals, event.target.value];
    setDeals(newDeals);
  };

  const handleMealChange = (event) => {
    const newMeals = [...meals, event.target.value];
    setMeals(newMeals);
  };

  const handleDeliveryChange = (event) => {
    const newDeliveries = [...deliveries, event.target.value];
    setDeliveries(newDeliveries);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h1>BizBite</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Orders</a></li>
            <li><a href="#">Restaurant</a></li>
          </ul>
        </nav>
      </header>
      <main className="main">
        <h2>Deals</h2>
        <div className="deals-container">
          <ul>
            {deals.map((deal, index) => (
              <li key={index}>{deal}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add deal..."
            onChange={handleDealChange}
          />
        </div>
        <h2>Meals</h2>
        <div className="meals-container">
          <ul>
            {meals.map((meal, index) => (
              <li key={index}>{meal}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add meal..."
            onChange={handleMealChange}
          />
        </div>
        <h2>Upcoming Deliveries</h2>
        <div className="deliveries-container">
          <ul>
            {deliveries.map((delivery, index) => (
               <li key={index}>{delivery}</li>
            ))}
          </ul>
          <input
            type="text"
            placeholder="Add delivery..."
            onChange={handleDeliveryChange}
          />
        </div>
      </main>
      <footer className="App-footer">
        <p>&copy; 2024 BizBite. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
