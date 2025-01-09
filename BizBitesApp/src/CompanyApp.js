import React, { useState } from 'react';

function CompanyApp() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      {/* Header Section */}
      <header style={headerStyle}>
        <div style={logoStyle}>BizBite Logo</div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>Home</button>
          <button style={buttonStyle}>Menu</button>
          <button style={buttonStyle}>Orders</button>
          <button style={buttonStyle}>Members</button>
          <button style={buttonStyle}>Profile</button>
        </div>
      </header>

      {/* Main Content Section */}
      <div style={bodyStyle}>
        {/* Search Section */}
        <section style={searchSectionStyle}>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchInputStyle}
          />
        </section>

        {/* Deals Section */}
        <section style={sectionStyle}>
          <h2>Deals</h2>
          <div style={scrollableContainerStyle}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={squareStyle}>
                Deal {index + 1}
              </div>
            ))}
          </div>
        </section>

        {/* Restaurants Section */}
        <section style={sectionStyle}>
          <h2>Restaurants</h2>
          <div style={scrollableContainerStyle}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={squareStyle}>
                Restaurant {index + 1}
              </div>
            ))}
          </div>
        </section>

        {/* Past Orders Section */}
        <section style={sectionStyle}>
          <h2>Past Orders</h2>
          <div style={scrollableContainerStyle}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} style={squareStyle}>
                Order {index + 1}
              </div>
            ))}
          </div>
        </section>

        {/* Employee Preferences Section */}
        <section style={employeePreferencesSectionStyle}>
          <h2>Employee Preferences</h2>
          <div style={preferencesContainerStyle}>
            <div style={preferenceItemStyle}>Preference 1</div>
            <div style={preferenceItemStyle}>Preference 2</div>
            <div style={preferenceItemStyle}>Preference 3</div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CompanyApp;

// Header Styles
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

// Main Body Styles
const bodyStyle = {
  padding: '20px',
};

// Search Section Styles
const searchSectionStyle = {
  padding: '20px 0',
};

const searchInputStyle = {
  padding: '10px',
  width: '250px',
  fontSize: '16px',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

// Section Styles
const sectionStyle = {
  marginBottom: '30px',
};

const scrollableContainerStyle = {
  display: 'flex',
  overflowX: 'scroll',
  gap: '10px',
  padding: '10px 0',
};

const squareStyle = {
  minWidth: '150px',
  minHeight: '150px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  flexShrink: 0,
};

// Employee Preferences Section Styles
const employeePreferencesSectionStyle = {
  marginTop: '30px',
};

const preferencesContainerStyle = {
  padding: '10px 0',
};

const preferenceItemStyle = {
  backgroundColor: '#f1f1f1',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
};
