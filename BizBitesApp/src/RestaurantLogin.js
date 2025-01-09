import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RestaurantLogin() {
  const [address, setAddress] = useState('');
  const [restaurantName, setRestaurantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/restaurant-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          restaurantName,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        // Navigate to the main app if authentication is successful
        navigate('/restaurant-app');
      } else {
        // Handle failed verification
        setErrorMessage(data.error || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Restaurant Login</h1>
      <div>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={restaurantName}
          onChange={(e) => setRestaurantName(e.target.value)}
          style={styles.input}
        />
        <br />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={styles.input}
        />
        <br />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={styles.input}
        />
        <br />
        <button
          onClick={handleLogin}
          disabled={!address || !restaurantName || !phoneNumber}
          style={styles.button}
        >
          Login
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
}

const styles = {
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '300px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007BFF',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default RestaurantLogin;
