import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function EmployeeAccount() {
  const [name, setName] = useState('');
  const [preferences, setPreferences] = useState('');
  const [dietaryNeeds, setDietaryNeeds] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Get token from localStorage
  const token = localStorage.getItem('authToken');

  // Fetch employee data on page load to populate the form
  useEffect(() => {
    if (!token) {
      setErrorMessage('No token found. Please log in.');
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/add/employee', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: token
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Populate fields with data from the backend
          setName(data.Name);
          setPhoneNumber(data.PhoneNumber);
          setPreferences(data.Preferences);
          setDietaryNeeds(data.Dietary_Needs);
        } else {
          setErrorMessage('Failed to fetch account details. Please try again.');
        }
      } catch (error) {
        setErrorMessage('An error occurred while fetching your data.');
        console.error('Fetch Error:', error);
      }
    };

    fetchData();
  }, [token]); // Re-fetch if token changes

  // Handle account update
  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:3000/add/employee', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: token,
          name,
          phoneNumber,
          preferences,
          dietaryNeeds,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert('Account updated successfully!');
      } else {
        setErrorMessage(data.message || 'Update failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Update Error:', error);
    }
  };

  // Handle account deletion
  const handleDelete = async () => {
    const confirm = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:3000/delete/employee/${phoneNumber}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber, // Example identifier for deletion
        }),
      });

      if (response.ok) {
        alert('Account deleted successfully.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/employee-login');
      } else {
        setErrorMessage('Failed to delete account. Please try again.');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
      console.error('Delete Error:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Employee Account</h1>
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
        <button onClick={handleUpdate} style={styles.updateButton}>Update Account</button>
        <button onClick={handleDelete} style={styles.deleteButton}>Delete Account</button>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        <br />
        <button
          onClick={() => navigate('/employee-app')}
          style={styles.backButton}
        >
          Back to App
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
  updateButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#28A745',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  deleteButton: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#DC3545',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 15px',
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

export default EmployeeAccount;