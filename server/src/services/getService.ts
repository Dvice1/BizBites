import pool from '../config/database';
import { Restaurant, Food, Deals, Orders, FoodStatistics, HealthyOptionsStats, HighValueMealDeals, BusinessDealAdvantages } from '../models/restaurantModel';

//prob don't need this
export async function obtainRestaurantName (
    restaurantName: string
  ): Promise<boolean> {
    try {
      const [rows] = await pool.execute<Restaurant[]>(
        'SELECT Name FROM Restaurant WHERE Name = ?',
        [restaurantName]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

export async function getRestaurantData(restaurantName: string): Promise<Restaurant[]> {
  try {
    const [rows] = await pool.execute<Restaurant[]>(
      'SELECT Id, Address, Name, Phone FROM Restaurant WHERE Name = ? LIMIT 50',
      [restaurantName]
    );

    return rows; // Return the data directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export async function getRestaurantFoods(restaurantName: string): Promise<Food[]> {
  try {
    const [rows] = await pool.execute<Food[]>(
      'SELECT item_name, price, calories FROM Food WHERE restaurant = ? LIMIT 50',
      [restaurantName]
    );

    return rows; // Return the meals directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

//gets a business's restaurant deals
export async function getRestaurantDeals(b_id: number): Promise<Deals[]> {
  try {
    const [rows] = await pool.execute<Deals[]>(
      'SELECT R_Id, B_Id, Discount_Percentage FROM Deals WHERE B_Id = ? LIMIT 50',
      [b_id]
    );

    return rows; // Return the meals directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

//gets employee's orders
export async function getEmpOrders(e_id: string): Promise<Orders[]> {
  try {

    const [rows] = await pool.execute<Orders[]>(
      'SELECT Order_Date, F_Ids FROM Orders WHERE E_Id = ? LIMIT 50',
      [e_id]
    );

    return rows; // Return the meals directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

// Async function that runs advanced query in a transaction
export async function getHighValueMealDeals(): Promise<HighValueMealDeals[]> {
  const connection = await pool.getConnection(); // Acquire a connection
  try {
    await connection.beginTransaction(); // Start the transaction
    const [rows] = await connection.execute<HighValueMealDeals[]>(`
      SELECT 
          r.Name as Restaurant_Name,
          AVG(d.Discount_Percentage) as Avg_Discount,
          COUNT(DISTINCT f.food_category) as Menu_Categories,
          AVG(f.price) as Avg_Price
      FROM Restaurant r
      JOIN Deals d ON r.Id = d.R_Id
      JOIN Product p ON r.Id = p.R_Id
      JOIN Food f ON p.F_Id = f.ID
      WHERE d.Discount_Percentage > (
          SELECT AVG(Discount_Percentage) * 0.3
          FROM Deals
      )
      GROUP BY r.Id, r.Name
      HAVING AVG(f.price) < (
          SELECT AVG(price) * 2
          FROM Food
      )
      ORDER BY Avg_Discount DESC;
    `);

    await connection.commit(); // Commit the transaction
    return rows; // Return the result set
  } catch (error) {
    await connection.rollback(); // Rollback the transaction if an error occurs
    console.error('Error executing high-value meal deals query:', error);
    throw error; // Rethrow the error to handle it in the calling code
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

// Async function to run stored procedure
export async function getAdvancedFoodStats(): Promise<FoodStatistics[]> {
  try {
    const [rows] = await pool.execute<FoodStatistics[]>(
      `CALL getAdvancedFoodStats`);

    return rows; // Return the result set
  } catch (error) {
    console.error('Error executing advanced food stats query:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}

// Async function that runs advanced query in a transaction
export async function getBusinessDealAdvantages(): Promise<BusinessDealAdvantages[]> {
  const connection = await pool.getConnection(); // Acquire a connection
  try {
    await connection.beginTransaction(); // Start the transaction

    const [rows] = await connection.execute<BusinessDealAdvantages[]>(`
      SELECT 
          r.Name as Restaurant_Name,
          AVG(d.Discount_Percentage) as Avg_Discount,
          COUNT(DISTINCT f.food_category) as Menu_Categories,
          AVG(f.price) as Avg_Price
      FROM Restaurant r
      JOIN Deals d ON r.Id = d.R_Id
      JOIN Product p ON r.Id = p.R_Id
      JOIN Food f ON p.F_Id = f.ID
      WHERE d.Discount_Percentage > (
          SELECT AVG(Discount_Percentage) * 0.3
          FROM Deals
      )
      GROUP BY r.Id, r.Name
      HAVING AVG(f.price) < (
          SELECT AVG(price) * 2
          FROM Food
      )
      ORDER BY Avg_Discount DESC;
    `);

    await connection.commit(); // Commit the transaction
    return rows; // Return the result set
  } catch (error) {
    await connection.rollback(); // Rollback the transaction if an error occurs
    console.error('Error executing business deal advantages query:', error);
    throw error; // Rethrow the error to handle it in the calling code
  } finally {
    connection.release(); // Release the connection back to the pool
  }
}

// Async function to run stored procedure
export async function getHealthyOptionsStats(): Promise<HealthyOptionsStats[]> {
  try {
    const [rows] = await pool.execute<HealthyOptionsStats[]>(
      `CALL getHealthyOptions`);

    return rows; // Return the result set
  } catch (error) {
    console.error('Error executing healthy options stats query:', error);
    throw error; // Rethrow the error to handle it in the calling code
  }
}