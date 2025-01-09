import { Router } from 'express';
import { getFoodId, getEmployee, createRestaurant, createBusiness, createDeal, updateEmployee, createOrder, createFood } from '../services/addService';

const router = Router();

//these routes are all prefaced by /add/
//ex: http://localhost:3000/add/restaurant/

// Create or update a restaurant
router.put('/restaurant', async (req, res) => {
    const { id, address, name, phone } = req.body;
  
    // Validate the input
    if (!id || !address || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields: id, address, name, and phone.' });
    }
  
    try {
      // Call the createRestaurant function
      await createRestaurant(id, address, name, phone);
      res.status(200).json({ message: `Restaurant '${name}' created or updated successfully.` });
    } catch (error) {
      console.error('Error creating or updating restaurant:', error);
      res.status(500).json({ error: 'Failed to create or update the restaurant.' });
    }
});

// PUT: Create or update a business
router.put('/business', async (req, res) => {
    const { id, address, name, phone } = req.body;
  
    if (!id || !address || !name || !phone) {
      return res.status(400).json({ error: 'Missing required fields: id, address, name, and phone.' });
    }
  
    try {
      await createBusiness(id, address, name, phone);
      res.status(200).json({ message: `Business '${name}' created or updated successfully.` });
    } catch (error) {
      console.error('Error creating or updating business:', error);
      res.status(500).json({ error: 'Failed to create or update the business.' });
    }
});
  
// PUT: Create or update an employee
router.put('/employee', async (req, res) => {
    const { id, name, phoneNumber, preferences, dietaryNeeds } = req.body;

    if (!id || !name || !preferences || !dietaryNeeds || !phoneNumber ) {
        return res.status(400).json({
        error: 'Missing required fields: id, name, preferences, dietary_needs, phone.',
        });
    }

    try {
        await updateEmployee(id, name, preferences, dietaryNeeds, phoneNumber);
        res.status(200).json({ message: `Employee '${name}' created or updated successfully.` });
    } catch (error) {
        console.error('Error creating or updating employee:', error);
        res.status(500).json({ error: 'Failed to create or update the employee.' });
    }
});

// POST: Create a new order
router.post('/order', async (req, res) => {
    const {e_id, order_date, food } = req.body;


    if (!e_id || !order_date || !food) {
      return res.status(400).json({ error: 'Missing required fields: e_id, order_date, and f_ids.' });
    }
  
    try {
      await createOrder(e_id, order_date, food);
      res.status(201).json({ message: `Order created successfully.` });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ error: 'Failed to create the order.' });
    }
});
  
// POST: Create a new deal
router.post('/deal', async (req, res) => {
    const { r_id, b_id, discount } = req.body;
  
    if (!r_id || !b_id || !discount) {
      return res.status(400).json({ error: 'Missing required fields: r_id, b_id, and discount.' });
    }
  
    try {
      await createDeal(r_id, b_id, discount);
      res.status(201).json({ message: `Deal between restaurant '${r_id}' and business '${b_id}' created successfully.` });
    } catch (error) {
      console.error('Error creating deal:', error);
      res.status(500).json({ error: 'Failed to create the deal.' });
    }
});
  
// POST: Create a new food
router.post('/food', async (req, res) => {
  const { id, name, price, calories, restaurant } = req.body;

  if (!id || !name || !price || !calories || !restaurant) {
    return res.status(400).json({ error: 'Missing required fields: o_id, e_id, order_date, and f_ids.' });
  }

  try {
    await createFood(id, name, price, calories, restaurant);
    res.status(201).json({ message: `Order '${name}' created successfully.` });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create the order.' });
  }
});

router.post('/employee', async (req, res) => {
  try {

    const { id } = req.body;

    if (!id ) {
      return res.status(400).json({ error: 'Invalid or missing Id query parameter' });
    }

    const employeeData = await getEmployee(id);
    res.status(200).json(employeeData[0]);
  } catch (error) {
    console.error('Error fetching Employee:', error);
    res.status(500).json({ error: 'Failed to fetch employee'});
  }
});


export default router;