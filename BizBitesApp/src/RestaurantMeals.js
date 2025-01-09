import React, { useState } from 'react';
import Header from './RestaurantHeader';

function MealsPage() {
  const [meals, setMeals] = useState([
    { id: 1, name: 'Cheeseburger', image: 'https://via.placeholder.com/100', price: 10.0, nutrition: '500 kcal' },
    { id: 2, name: 'Veggie Pizza', image: 'https://via.placeholder.com/100', price: 12.0, nutrition: '700 kcal' },
    { id: 3, name: 'Caesar Salad', image: 'https://via.placeholder.com/100', price: 8.0, nutrition: '300 kcal' },
  ]);

  const [newMeal, setNewMeal] = useState({ name: '', image: '', price: '', nutrition: '' });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.image || !newMeal.price || !newMeal.nutrition) {
      alert('Please fill in all fields for the new meal.');
      return;
    }

    const newMealData = { id: meals.length + 1, ...newMeal, price: parseFloat(newMeal.price) };
    setMeals([...meals, newMealData]);
    setNewMeal({ name: '', image: '', price: '', nutrition: '' });
  };

  return (
    <div>
      <Header />
      <div style={bodyStyle}>
        <h1>Meals</h1>

        {/* Create Meal Form */}
        <div style={formStyle}>
          <input
            type="text"
            placeholder="Meal Name"
            value={newMeal.name}
            onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newMeal.image}
            onChange={(e) => setNewMeal({ ...newMeal, image: e.target.value })}
            style={inputStyle}
          />
          <input
            type="number"
            placeholder="Price ($)"
            value={newMeal.price}
            onChange={(e) => setNewMeal({ ...newMeal, price: e.target.value })}
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Nutritional Info"
            value={newMeal.nutrition}
            onChange={(e) => setNewMeal({ ...newMeal, nutrition: e.target.value })}
            style={inputStyle}
          />
          <button style={buttonStyle} onClick={handleAddMeal}>
            Add Meal
          </button>
        </div>

        {/* Meals List */}
        <div style={scrollableContainerStyle}>
          {meals.map((meal) => (
            <div key={meal.id} style={mealBoxStyle}>
              <h3>{meal.name}</h3>
              <img src={meal.image} alt={meal.name} style={imageStyle} />
              <p>Price: ${meal.price.toFixed(2)}</p>
              <p>{meal.nutrition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MealsPage;

// Styles
const bodyStyle = { padding: '20px' };

const formStyle = {
  display: 'flex',
  gap: '10px',
  marginBottom: '20px',
  alignItems: 'center',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  flex: '1',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const scrollableContainerStyle = { display: 'flex', overflowX: 'scroll', gap: '10px', padding: '10px 0' };

const mealBoxStyle = {
  minWidth: '250px',
  minHeight: '200px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  padding: '10px',
};

const imageStyle = { width: '100px', height: '100px', borderRadius: '10px' };
