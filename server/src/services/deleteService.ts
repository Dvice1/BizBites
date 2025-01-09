import pool from '../config/database';
import { Restaurant, Food, Business, Deals, Employees, Orders } from '../models/restaurantModel';

//function to delete a restaurant
export async function deleteRestaurant(phoneNumber: string): Promise<void> {
    try {
      await pool.execute<Restaurant[]>(
        'DELETE FROM Restaurant WHERE Phone = ?',
        [phoneNumber]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function for a restaurant to delete food
export async function deleteFood(restaurantName: string, foodName: string): Promise<void> {
    try {
      await pool.execute<Food[]>(
        'DELETE FROM Food WHERE restaurantName = ? AND item_name = ?',
        [restaurantName, foodName]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to delete Employee
export async function deleteEmployee(phoneNumber: string): Promise<void> {
    try {
      await pool.execute<Employees[]>(
        'DELETE FROM Employee WHERE PhoneNumber = ?',
        [phoneNumber]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to delete order
export async function deleteOrder(id: number): Promise<void> {
    try {
      await pool.execute<Orders[]>(
        'DELETE FROM Orders WHERE O_Id = ?',
        [id]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to delete deal
export async function deleteDeal(r_id: number, b_id: number): Promise<void> {
    try {
      await pool.execute<Deals[]>(
        'DELETE FROM Deals WHERE R_Id = ? AND B_Id = ?',
        [r_id, b_id]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};

//function to delete a business
export async function deleteBusiness(phone: string): Promise<void> {
    try {
      await pool.execute<Business[]>(
        'DELETE FROM Business WHERE Phone = ?',
        [phone]
      );
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
};