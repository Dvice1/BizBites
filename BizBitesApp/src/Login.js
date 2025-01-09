import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userType, setUserType] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (userType === 'restaurant') navigate('/restaurant-login');
    else if (userType === 'employee') navigate('/employee-login');
    else if (userType === 'company') navigate('/company-login');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to BizBite</h1>
      <p style={styles.subtitle}>Please select your user type to continue:</p>
      <div style={styles.radioContainer}>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="restaurant"
            checked={userType === 'restaurant'}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.radioInput}
          />
          Restaurant
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="employee"
            checked={userType === 'employee'}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.radioInput}
          />
          Employee
        </label>
        <label style={styles.radioLabel}>
          <input
            type="radio"
            value="company"
            checked={userType === 'company'}
            onChange={(e) => setUserType(e.target.value)}
            style={styles.radioInput}
          />
          Company
        </label>
      </div>
      <button
        onClick={handleContinue}
        disabled={!userType}
        style={userType ? styles.button : styles.disabledButton}
      >
        Continue
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2.5em',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2em',
    marginBottom: '20px',
    color: '#666',
  },
  radioContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  },
  radioLabel: {
    marginBottom: '10px',
    fontSize: '1.1em',
    color: '#444',
    cursor: 'pointer',
  },
  radioInput: {
    marginRight: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1em',
    color: 'white',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  disabledButton: {
    padding: '10px 20px',
    fontSize: '1em',
    color: 'white',
    backgroundColor: '#aaa',
    border: 'none',
    borderRadius: '5px',
    cursor: 'not-allowed',
  },
};

export default Login;
