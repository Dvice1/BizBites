import { Router } from 'express';
import { deleteDeal, deleteEmployee, deleteFood, deleteOrder, deleteRestaurant, deleteBusiness } from '../services/deleteService';

const router = Router();

//these routes are all prefaced by /delete/
//ex: http://localhost:3000/delete/restaurant/:restaurantName

// Delete a restaurant
router.delete('/restaurant/:phone', async (req, res) => {
  const { phone } = req.params;

  try {
    await deleteRestaurant(phone);
    res.status(200).json({ message: `Restaurant with phone number '${phone}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting restaurant:', error);
    res.status(500).json({ error: 'Failed to delete the restaurant.' });
  }
});

// Delete a business
router.delete('/business/:phone', async (req, res) => {
  const { phone } = req.params;

  try {
    await deleteBusiness(phone);
    res.status(200).json({ message: `Business with phone number '${phone}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting business:', error);
    res.status(500).json({ error: 'Failed to delete the business.' });
  }
});

// Delete a food item for a specific restaurant
router.delete('/restaurant/:restaurantName/food/:foodName', async (req, res) => {
  const { restaurantName, foodName } = req.params;

  try {
    await deleteFood(restaurantName, foodName);
    res.status(200).json({ message: `Food '${foodName}' from restaurant '${restaurantName}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting food:', error);
    res.status(500).json({ error: 'Failed to delete the food item.' });
  }
});

// Delete an employee by name
router.delete('/employee/:phoneNumber', async (req, res) => {
  const { phoneNumber } = req.params;

  try {
    await deleteEmployee(phoneNumber);
    res.status(200).json({ message: `Employee with phone number '${phoneNumber}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Failed to delete the employee.' });
  }
});

// Delete an order by ID
router.delete('/order/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await deleteOrder(parseInt(id, 10));
    res.status(200).json({ message: `Order with ID '${id}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ error: 'Failed to delete the order.' });
  }
});

// Delete a deal by restaurant ID and business ID
router.delete('/deal', async (req, res) => {
  const { r_id, b_id } = req.query;

  if (!r_id || !b_id) {
    return res.status(400).json({ error: 'Missing required query parameters: r_id and b_id.' });
  }

  try {
    await deleteDeal(parseInt(r_id as string, 10), parseInt(b_id as string, 10));
    res.status(200).json({ message: `Deal between restaurant ID '${r_id}' and business ID '${b_id}' deleted successfully.` });
  } catch (error) {
    console.error('Error deleting deal:', error);
    res.status(500).json({ error: 'Failed to delete the deal.' });
  }
});

export default router;
