import React, { useState } from 'react';
import Header from './RestaurantHeader';

function OrdersPage() {
  const [orders, setOrders] = useState([
    { id: 1, companyName: 'TechCorp', location: '123 Tech Street', time: '12:30 PM', details: '2 Pizzas, 3 Burgers', price: 45.0, status: 'Pending' },
    { id: 2, companyName: 'HealthWorks', location: '456 Wellness Ave', time: '1:00 PM', details: '5 Salads', price: 50.0, status: 'Pending' },
    { id: 3, companyName: 'EduNation', location: '789 Study Lane', time: '2:00 PM', details: '4 Burgers, 3 Pizzas', price: 80.0, status: 'Pending' },
  ]);

  // Handler to cancel an order
  const handleCancelOrder = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === id ? { ...order, status: 'Cancelled' } : order))
    );
  };

  // Handler to complete an order
  const handleCompleteOrder = (id) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => (order.id === id ? { ...order, status: 'Completed' } : order))
    );
  };

  return (
    <div>
      <Header />
      <div style={bodyStyle}>
        <h1>Orders</h1>
        {orders.map((order) => (
          <div key={order.id} style={orderBoxStyle}>
            <h3>Company: {order.companyName}</h3>
            <p>Location: {order.location}</p>
            <p>Time: {order.time}</p>
            <p>Order Details: {order.details}</p>
            <p>Price: ${order.price.toFixed(2)}</p>
            <p>Status: {order.status}</p>
            <div style={buttonContainerStyle}>
              <button
                style={cancelButtonStyle}
                onClick={() => handleCancelOrder(order.id)}
                disabled={order.status !== 'Pending'}
              >
                Cancel
              </button>
              <button
                style={completeButtonStyle}
                onClick={() => handleCompleteOrder(order.id)}
                disabled={order.status !== 'Pending'}
              >
                Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;

// Styles
const bodyStyle = { padding: '20px' };

const orderBoxStyle = {
  backgroundColor: '#f1f1f1',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  padding: '20px',
  marginBottom: '20px',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
  marginTop: '10px',
};

const cancelButtonStyle = {
  backgroundColor: 'red',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
};

const completeButtonStyle = {
  backgroundColor: 'green',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  padding: '10px',
  cursor: 'pointer',
};
