import { Router } from 'express';
import { getRestaurantFoods, getEmpOrders, getRestaurantDeals, 
         getAdvancedFoodStats, getHealthyOptionsStats, 
         getHighValueMealDeals, getBusinessDealAdvantages, getRestaurantData } from '../services/getService';

const router: Router = Router();

//these routes are all prefaced by /get/
//ex: http://localhost:3000/get/meals

router.get('/meals', async (req, res) => {
  try {
    const restaurantName = req.query.restaurantName;

    // Ensure `restaurantName` is a string
    if (typeof restaurantName !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing restaurantName query parameter' });
    }

    // Call the function with the validated string
    const meals = await getRestaurantFoods(restaurantName);
    res.status(200).json(meals);
  } catch (error) {
    console.error('Error fetching meals:', error);
    res.status(500).json({ error: 'Failed to fetch meals' });
  }
});

router.get('/restaurant', async (req, res) => {
  try {
    const restaurantName = req.query.restaurantName;

    // Ensure `restaurantName` is a string
    if (typeof restaurantName !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing restaurantName query parameter' });
    }

    // Call the function with the validated string
    const data = await getRestaurantData(restaurantName);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching restaurant data:', error);
    res.status(500).json({ error: 'Failed to fetch restaurant data' });
  }
});

// Route to get a business's restaurant deals
router.get('/deals', async (req, res) => {
  try {
    const { b_id } = req.query;

    if (!b_id || isNaN(Number(b_id))) {
      return res.status(400).json({ error: 'Invalid or missing b_id query parameter' });
    }

    const deals = await getRestaurantDeals(Number(b_id));
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching deals:', error);
    res.status(500).json({ error: 'Failed to fetch deals' });
  }
});

// Route to get an employee's orders
router.get('/orders', async (req, res) => {
  try {
    const { e_id } = req.query;

    if (!e_id) {
      return res.status(400).json({ error: 'Invalid or missing e_id query parameter' });
    }

    const orders = await getEmpOrders(e_id as string);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

//advanced queries

router.get('/food-stats', async (req, res) => {
  try {
    const stats = await getAdvancedFoodStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching food stats:', error);
    res.status(500).json({ error: 'Failed to fetch food statistics' });
  }
});

router.get('/healthy-options', async (req, res) => {
  try {
    const stats = await getHealthyOptionsStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching healthy options stats:', error);
    res.status(500).json({ error: 'Failed to fetch healthy options statistics' });
  }
});

router.get('/high-value-deals', async (req, res) => {
  try {
    const deals = await getHighValueMealDeals();
    res.status(200).json(deals);
  } catch (error) {
    console.error('Error fetching high-value meal deals:', error);
    res.status(500).json({ error: 'Failed to fetch high-value meal deals' });
  }
});

router.get('/business-deal-advantages', async (req, res) => {
  try {
    const businessDeals = await getBusinessDealAdvantages();
    res.status(200).json(businessDeals);
  } catch (error) {
    console.error('Error fetching business deal advantages:', error);
    res.status(500).json({ error: 'Failed to fetch business deal advantages' });
  }
});

  export default router;