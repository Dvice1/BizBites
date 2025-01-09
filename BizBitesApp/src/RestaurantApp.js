import React, { useEffect, useState } from 'react';
import Header from './RestaurantHeader';

function Restaurant() {
  // Sample Data
  const sampleDeals = [
    { id: 1, title: 'Pizza Deal', description: '20% off on all pizzas!', imageUrl: 'https://via.placeholder.com/100' },
    { id: 2, title: 'Burger Combo', description: 'Buy 1 get 1 free on burgers!', imageUrl: 'https://via.placeholder.com/100' },
    { id: 3, title: 'Pasta Feast', description: 'Flat $5 off on all pastas!', imageUrl: 'https://via.placeholder.com/100' },
  ];

  const [sampleMeals, setSampleMeals] = useState([
    { id: 1, name: 'Cheeseburger', image: 'https://via.placeholder.com/100', price: 10.0, nutrition: '500 kcal' },
    { id: 2, name: 'Veggie Pizza', image: 'https://via.placeholder.com/100', price: 12.0, nutrition: '700 kcal' },
    { id: 3, name: 'Caesar Salad', image: 'https://via.placeholder.com/100', price: 8.0, nutrition: '300 kcal' },
  ]);

  const sampleOrders = [
    { id: 1, companyName: 'TechCorp', location: '123 Tech Street', time: '12:30 PM', details: '2 Pizzas, 3 Burgers', price: 45.0, status: 'Pending' },
    { id: 2, companyName: 'HealthWorks', location: '456 Wellness Ave', time: '1:00 PM', details: '5 Salads', price: 50.0, status: 'Pending' },
    { id: 3, companyName: 'EduNation', location: '789 Study Lane', time: '2:00 PM', details: '4 Burgers, 3 Pizzas', price: 80.0, status: 'Pending' },
  ];

  // Fetch meals when the component mounts
  useEffect(() => {
    const gettingFoods = async () => {
      try {
        const response = await fetch('http://localhost:3000/get/meals', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Parse the JSON response
        const data = await response.json();
    
        if (response.ok) {
    
          // format data 
          const formattedMeals = data.map((meal, index) => ({
            id: index + 1, // Generate a unique ID
            name: meal.item_name,
            image: 'https://via.placeholder.com/100',
            price: meal.price,
            calories: `${meal.calories} kcal` // Format calories
          }));
          
          setSampleMeals(formattedMeals);
        }
      } catch (error) {
        console.error('gettingFoods Function:', error);
        return [];
      }
    };

    gettingFoods();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <Header />
      <div style={bodyStyle}>
        {/* Deals Section */}
        <section style={sectionStyle}>
          <h2>Deals</h2>
          <div style={scrollableContainerStyle}>
            {sampleDeals.map((deal) => (
              <div key={deal.id} style={dealBoxStyle}>
                <h3>{deal.title}</h3>
                <p>{deal.description}</p>
                <img src={deal.imageUrl} alt={deal.title} style={imageStyle} />
              </div>
            ))}
          </div>
        </section>

        {/* Meals Section */}
        <section style={sectionStyle}>
          <h2>Meals</h2>
          <div style={scrollableContainerStyle}>
            {sampleMeals.map((meal) => (
              <div key={meal.id} style={mealBoxStyle}>
                <h3>{meal.name}</h3>
                <img src={meal.image} alt={meal.name} style={imageStyle} />
                <p>Price: ${meal.price.toFixed(2)}</p>
                <p>{meal.nutrition}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Orders Section */}
        <section style={sectionStyle}>
          <h2>Orders</h2>
          <div style={scrollableContainerStyle}>
            {sampleOrders.map((order) => (
              <div key={order.id} style={orderBoxStyle}>
                <h3>Company: {order.companyName}</h3>
                <p>Location: {order.location}</p>
                <p>Time: {order.time}</p>
                <p>Order Details: {order.details}</p>
                <p>Price: ${order.price.toFixed(2)}</p>
                <p>Status: {order.status}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Restaurant;

// Styles
const bodyStyle = { padding: '20px' };
const sectionStyle = { marginBottom: '30px' };
const scrollableContainerStyle = { display: 'flex', overflowX: 'scroll', gap: '10px', padding: '10px 0' };

const dealBoxStyle = {
  minWidth: '200px',
  minHeight: '150px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  padding: '10px',
};

const mealBoxStyle = {
  ...dealBoxStyle,
  width: '250px',
  height: '200px',
};

const orderBoxStyle = {
  ...dealBoxStyle,
  width: '300px',
  height: '250px',
  textAlign: 'left',
  padding: '15px',
};

const imageStyle = { width: '100px', height: '100px', borderRadius: '10px' };