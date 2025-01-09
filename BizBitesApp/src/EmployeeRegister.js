import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeRegister() {
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [dietaryNeeds, setDietaryNeeds] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/create-employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          preferences,
          dietaryNeeds,
          phoneNumber,
          businessName,
          businessPhoneNumber,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Save the token to localStorage (you can also use sessionStorage)
        localStorage.setItem('authToken', data.token);
        
        // Redirect to the app/dashboard after successful registration
        navigate('/employee-login');
      } else {
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Registration Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Registration</h1>
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />
        <br />
        <textarea
          placeholder="Preferences"
          value={preferences}
          onChange={(e) => setPreferences(e.target.value)}
          style={styles.textarea}
        />
        <br />
        <textarea
          placeholder="Dietary Needs"
          value={dietaryNeeds}
          onChange={(e) => setDietaryNeeds(e.target.value)}
          style={styles.textarea}
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
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          style={styles.input}
        />
        <br />
        <input
          type="tel"
          placeholder="Business Phone Number"
          value={businessPhoneNumber}
          onChange={(e) => setBusinessPhoneNumber(e.target.value)}
          style={styles.input}
        />
        <br />
        <button
          onClick={handleRegister}
          disabled={!name || !phoneNumber || !businessName || !businessPhoneNumber}
          style={{
            ...styles.button,
            backgroundColor: name && phoneNumber && businessName && businessPhoneNumber
              ? '#28A745'
              : '#CCC',
          }}
        >
          Register
        </button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <br />
        <button
          onClick={() => navigate('/employee-login')}
          style={styles.backButton}
        >
          Back to Login
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
  textarea: {
    padding: '10px',
    margin: '10px 0',
    width: '300px',
    height: '80px',
    fontSize: '16px',
    resize: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backButton: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#FFF',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
  },
};

export default EmployeeRegister;
