import { get } from 'http';
import pool from '../config/database';
import { Restaurant, Food, Business, Deals, Employees, Orders } from '../models/restaurantModel';

//function to create a restaurant
export async function createRestaurant(id: number, address: string, name: string, phone: number): Promise<void> {
    try {
      await pool.execute<Restaurant[]>(
        'INSERT INTO Restaurant (Id, Address, Name, Phone) VALUES(?, ?, ?, ?)',
        [id, address, name, phone]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to create a business
export async function createBusiness(id: number, address: string, name: string, phone: number): Promise<void> {
    try {
      await pool.execute<Business[]>(
        'INSERT INTO Business (Id, Address, Name, Phone) VALUES(?, ?, ?, ?)',
        [id, address, name, phone]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to create an employee
export async function updateEmployee( id: string, name: string, preferences: string, dietary_needs: string, phone: number): Promise<void> {
    try {
      await pool.execute<Employees[]>(
        'UPDATE Employee SET Name = ?, Preferences = ?, Dietary_Needs = ?, PhoneNumber = ? WHERE Id = ?',
        [name, preferences, dietary_needs, phone, id]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to create an Order
export async function createOrder( e_id: number, order_date: string, food: string): Promise<void> {
    try {
      await pool.execute<Orders[]>(
        'INSERT INTO Orders (E_Id, Order_Date, F_Ids) VALUES(?, ?, ?)',
        [e_id, order_date, food]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to create a deal
export async function createDeal(r_id: number, b_id: number, discount: number): Promise<void> {
    try {
      await pool.execute<Deals[]>(
        'INSERT INTO Deals (R_Id, B_Id, Discount_Percentage) VALUES(?, ?, ?)',
        [r_id, b_id, discount]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to create food
export async function createFood(  id: number, name: string, price: number, calories: number, restaurant: string): Promise<void> {
  try {
    await pool.execute<Food[]>(
      'INSERT INTO Food (ID, item_name, price, calories, restaurant) VALUES(?, ?, ?, ?, ?)',
      [id, name, price, calories, restaurant]
    );
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

//function to update a restaurant's address
export async function updateRestaurantPhone(restaurantName: string, phone: number): Promise<void> {
    try {
      await pool.execute<Restaurant[]>(
        'UPDATE Restaurant SET Phone = ? WHERE restaurantName = ? LIMIT 1',
        [phone, restaurantName]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to update a restaurant's address
export async function updateRestaurantAddress(restaurantName: string, restaurantAddress: string): Promise<void> {
    try {
      await pool.execute<Restaurant[]>(
        'UPDATE Restaurant SET Address = ? WHERE restaurantName = ? LIMIT 1',
        [restaurantAddress, restaurantName]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};


/**
 * Retrieves employee details from the database using the provided employee Id.
 * 
 * @param Id - The unique identifier of the employee.
 * @returns A promise that resolves to an array of Employee objects matching the given Id.
 * @throws Will throw an error if there is a database execution error.
 */
export async function getEmployee(Id: string): Promise<Employees[]> {
  try {
    const [rows] = await pool.execute<Employees[]>(
      'SELECT Name, PhoneNumber, Preferences, Dietary_Needs FROM Employee WHERE Id = ?',
      [Id]
    );

    return rows; // Return the meals directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

export async function getFoodId(food: string): Promise<Food[]> {
  try {
    const [rows] = await pool.execute<Food[]>(
      'SELECT Id FROM Food WHERE item_name = ? LIMIT 1',
      [food]
    );

    return rows; // Return the meals directly
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};