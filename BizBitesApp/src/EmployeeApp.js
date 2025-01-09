import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatBot from './Chatbot'; // Import the chatbot component
import { askGPT } from './chatHelper'; 

function EmployeeApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [deals, setDeals] = useState([]);
  const [orders, setOrders] = useState([]);
  const [foodStats, setFoodStats] = useState([]);
  const [healthyOptionsStats, setHealthyOptionsStats] = useState([]);
  const [gptResponse, setGptResponse] = useState('');
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const [foodName, setFoodName] = useState(''); // State to hold food name
  const [date, setDate] = useState(''); // State to hold selected date
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const [restaurantName, setRestaurantName] = useState('');

  const [selectedFoodStatsColumns, setSelectedFoodStatsColumns] = useState([
    'food_category', 'avg_calories', 'avg_protein', 'item_count', 'avg_price'
  ]);

  const [selectedHealthyOptionsColumns, setSelectedHealthyOptionsColumns] = useState([
    'food_category', 'Total_Items', 'Avg_Protein_Grams', 'Avg_Calories', 'Avg_Protein_Calorie_Ratio', 
    'Min_Price', 'Max_Price', 'Protein_Price_Value'
  ]);

  const foodStatsColumns = [
    { key: 'food_category', label: 'Category' },
    { key: 'avg_calories', label: 'Avg Calories' },
    { key: 'avg_protein', label: 'Avg Protein' },
    { key: 'item_count', label: 'Item Count' },
    { key: 'avg_price', label: 'Avg Price' },
  ];

  const healthyOptionsColumns = [
    { key: 'food_category', label: 'Category' },
    { key: 'Total_Items', label: 'Total Items' },
    { key: 'Avg_Protein_Grams', label: 'Avg Protein (g)' },
    { key: 'Avg_Calories', label: 'Avg Calories' },
    { key: 'Avg_Protein_Calorie_Ratio', label: 'Protein-Calorie Ratio' },
    { key: 'Min_Price', label: 'Min Price' },
    { key: 'Max_Price', label: 'Max Price' },
    { key: 'Protein_Price_Value', label: 'Protein-Price Value' },
  ];
  const fetchData = async () => {
    try {
      const b_id = 1; // Replace with actual business ID
      const e_id = token; // Replace with actual employee ID

      // Fetch meals
      const mealResponse = await fetch(`http://localhost:3000/get/meals?restaurantName=${encodeURIComponent(restaurantName)}`);
      const mealData = await mealResponse.json();

    // Format prices and include the food name
    const formattedMeals = mealData.map((meal) => ({
      ...meal,
      price: meal.price ? parseFloat(meal.price).toFixed(2) : 'N/A',
      name: meal.item_name || 'Unknown Food Name',
    }));
    setMeals(formattedMeals);

      // Fetch deals
      const dealResponse = await fetch(`http://localhost:3000/get/deals?b_id=${b_id}`);
      const dealData = await dealResponse.json();
      setDeals(dealData);

      // Fetch orders
      const orderResponse = await fetch(`http://localhost:3000/get/orders?e_id=${e_id}`);
      const orderData = await orderResponse.json();
      setOrders(orderData);

      // Fetch advanced stats
      const foodStatsResponse = await fetch('http://localhost:3000/get/food-stats');
      const foodStatsData = await foodStatsResponse.json();
      // Assuming the actual data is in the first element of the returned array
      setFoodStats(Array.isArray(foodStatsData[0]) ? foodStatsData[0] : []);

      const healthyOptionsResponse = await fetch('http://localhost:3000/get/healthy-options');
      const healthyOptionsData = await healthyOptionsResponse.json();

      const actualHealthyOptionsData = Array.isArray(healthyOptionsData) 
        ? (Array.isArray(healthyOptionsData[0]) ? healthyOptionsData[0] : healthyOptionsData)
        : [];
      setHealthyOptionsStats(actualHealthyOptionsData);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []); 
  
  const handleColumnChange = (e, setSelectedColumns) => {
    const { options } = e.target;
    const selected = Array.from(options)
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedColumns(selected);
  };

  // Handle the GPT request
  const handleAskGPT = async () => {
    if (searchQuery.trim()) {
      const response = await askGPT(searchQuery);
      setGptResponse(response);
    } else {
      setGptResponse('Please enter a question or prompt.');
    }
  };

   // Handle the user input from the dropdown
   const handleSubmit = async () => {
    if (foodName && date) {
      try {
        const response = await fetch(`http://localhost:3000/add/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            e_id : token,
            order_date: date,
            food: foodName
          }),
        });
        const data = await response.json();
        console.log('Order Details:', data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    } else {
      alert('Please provide both food name and date.');
    }
  };

  return (
    <div>
      {/* Header Section */}
      <header style={headerStyle}>
        <div style={logoStyle}>BizBite Logo</div>
        <div style={buttonContainerStyle}>
          <button style={buttonStyle}>Home</button>
          <button style={buttonStyle}>Menu</button>
          <button style={buttonStyle}>Orders</button>
          <button style={buttonStyle} onClick={() => navigate('/employee-account')}>Profile</button>
        </div>
      </header>
      <div style={{ padding: '20px' }}>
        <input 
          type="text" 
          placeholder="Enter Restaurant Name" 
          value={restaurantName} 
          onChange={(e) => setRestaurantName(e.target.value)} 
          style={{
            padding: '10px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <button 
          onClick={fetchData} 
          style={{
            padding: '10px 15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Fetch Data
        </button>
      </div>
      {/* Dropdown to enter food name and date */}
      <section style={dropdownSectionStyle}>
        <button 
          style={buttonStyle} 
          onClick={() => setShowDropdown(prevState => !prevState)}
        >
          Add Order Details
        </button>
        {showDropdown && (
          <div style={dropdownMenuStyle}>
            <input 
              type="text" 
              placeholder="Food Name" 
              value={foodName} 
              onChange={(e) => setFoodName(e.target.value)} 
              style={inputStyle} 
            />
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
              style={inputStyle} 
            />
            <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </section>

      {/* Search Section */}
      <section style={searchSectionStyle}>
        <input
          type="text"
          placeholder="Search by meal or restaurant"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={searchInputStyle}
        />
        <button onClick={handleAskGPT} style={askButtonStyle}>Ask GPT</button>
      </section>

      {/* GPT Response Section */}
      {gptResponse && (
        <section style={gptResponseStyle}>
          <h2>GPT Response:</h2>
          <p>{gptResponse}</p>
        </section>
      )}

      <section style={resultsSectionStyle}>
        <h2>Meals</h2>
        <div style={resultsContainerStyle}>
          {meals.map((meal, index) => (
            <div key={index} style={resultsItemStyle}>
              <img src="https://via.placeholder.com/100" alt="Menu Item" style={imgStyle} />
              <h3>{meal.name}</h3>
              <p>Price: ${meal.price}</p>
              <p>{meal.description}</p>
            </div>
          ))}
        </div>
        {meals.length === 0 && <p>No meals available</p>}
      </section>

      <section style={featuredStyle}>
        <h2>Deals</h2>
        <div style={scrollableContainerStyle}>
          {deals.map((deal, index) => (
            <div key={index} style={featuredSquareStyle}>
              <h3>{deal.title}</h3>
              <p>{deal.description}</p>
              <p>Discount: {deal.discountPercentage}%</p>
            </div>
          ))}
        </div>
        {deals.length === 0 && <p>No deals available</p>}
      </section>

      <section style={orderTrackingStyle}>
        <h2>Orders</h2>
        <div>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={index} style={orderItemStyle}>
                <h3>Order Date: {order.Order_Date}</h3>
                <p>Food: {order.F_Ids}</p>
              </div>
            ))
          ) : (
            <p>No orders available</p>
          )}
        </div>
      </section>

      <section style={statsSectionStyle}>
        <h2>Advanced Stats</h2>

        {/* Food Stats */}
        <div>
          <h3>Food Stats</h3>
          <select
            multiple
            value={selectedFoodStatsColumns}
            onChange={(e) => handleColumnChange(e, setSelectedFoodStatsColumns)}
            style={dropdownStyle}
          >
            {foodStatsColumns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          {Array.isArray(foodStats) && foodStats.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  {selectedFoodStatsColumns.map((colKey) => (
                    <th key={colKey}>{foodStatsColumns.find((col) => col.key === colKey)?.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {foodStats.map((stat, index) => (
                  <tr key={index}>
                    {selectedFoodStatsColumns.map((colKey) => (
                      <td key={colKey}>{stat[colKey]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No food stats available</p>
          )}
        </div>

        {/* Healthy Options Stats */}
        <div>
          <h3>Healthy Options Stats</h3>
          <select
            multiple
            value={selectedHealthyOptionsColumns}
            onChange={(e) => handleColumnChange(e, setSelectedHealthyOptionsColumns)}
            style={dropdownStyle}
          >
            {healthyOptionsColumns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
          {Array.isArray(healthyOptionsStats) && healthyOptionsStats.length > 0 ? (
            <table style={tableStyle}>
              <thead>
                <tr>
                  {selectedHealthyOptionsColumns.map((colKey) => (
                    <th key={colKey}>{healthyOptionsColumns.find((col) => col.key === colKey)?.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {healthyOptionsStats.map((stat, index) => (
                  <tr key={index}>
                    {selectedHealthyOptionsColumns.map((colKey) => (
                      <td key={colKey}>{stat[colKey]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No healthy options stats available</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default EmployeeApp;

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

const askButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  border: '1px solid #4CAF50',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '1rem',
};

const gptResponseStyle = {
  padding: '20px 0',
  backgroundColor: '#f9f9f9',
  border: '1px solid #ddd',
  borderRadius: '5px',
};

const featuredStyle = {
  padding: '20px 0',
};

const scrollableContainerStyle = {
  display: 'flex',
  overflowX: 'scroll',
  gap: '10px',
  padding: '10px 0',
};

const featuredSquareStyle = {
  minWidth: '150px',
  minHeight: '100px',
  backgroundColor: '#f1f1f1',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  flexShrink: 0,
};

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

const resultsSectionStyle = {
  padding: '20px 0',
};

const resultsContainerStyle = {
  display: 'flex',
  gap: '15px',
};

const resultsItemStyle = {
  width: '200px',
  textAlign: 'center',
  border: '1px solid #ddd',
  padding: '10px',
  borderRadius: '8px',
};

const imgStyle = {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '5px',
};

const orderTrackingStyle = {
  padding: '20px 0',
  backgroundColor: '#f9f9f9',
};

const orderItemStyle = { 
  padding: '10px', border: '1px solid #ddd', marginBottom: '10px' 
};

const statsSectionStyle = { 
  padding: '20px 0' 
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginBottom: '20px',
};

const dropdownStyle = {
  marginBottom: '10px',
  width: '100%',
  height: '100px',
};

const dropdownSectionStyle = {
  padding: '20px 0',
  textAlign: 'center',
};

const dropdownMenuStyle = {
  marginTop: '10px',
  backgroundColor: '#f9f9f9',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
};

const inputStyle = {
  padding: '10px',
  margin: '5px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  width: '200px',
};