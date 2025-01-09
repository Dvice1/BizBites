import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeLogin() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/employee-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phoneNumber,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save the token to localStorage (you can also use sessionStorage)
        localStorage.setItem('authToken', data.token);
        navigate('/employee-app'); // Redirect to the app/dashboard after login
      } else {
        setErrorMessage(data.message || 'Authentication failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Login</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          disabled={!name || !phoneNumber}
          style={{
            ...styles.button,
            backgroundColor: name && phoneNumber ? '#007BFF' : '#CCC',
          }}
        >
          Login
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <br />
        {/* Register Button */}
        <button
          onClick={() => navigate('/employee-register')}
          style={styles.registerButton}
        >
          Register
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F9F9F9',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    width: '300px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  registerButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#28A745',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default EmployeeLogin;
