import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <header style={headerStyle}>
      <div style={logoStyle}>BizBite Logo</div>
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={() => navigate('/restaurant-app')}>
          Home
        </button>
        <button style={buttonStyle} onClick={() => navigate('/restaurant-orders')}>
          Orders
        </button>
        <button style={buttonStyle} onClick={() => navigate('/restaurant-meals')}>
          Meals
        </button>
      </div>
    </header>
  );
}

export default Header;

// Styles
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const buttonContainerStyle = {
  display: 'flex',
  gap: '10px',
};

const buttonStyle = {
  backgroundColor: 'white',
  color: '#4CAF50',
  border: '1px solid #4CAF50',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
};
