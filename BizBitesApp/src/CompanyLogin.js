import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CompanyLogin() {
  const [address, setAddress] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/company-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          address,
          companyName,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        // Navigate to the main app if authentication is successful
        navigate('/company-app');
      } else {
        // Handle failed verification
        setErrorMessage(data.errors[0].msg || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Company Login</h1>
      <div>
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
          disabled={!address || !companyName || !phoneNumber}
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

export default CompanyLogin;
