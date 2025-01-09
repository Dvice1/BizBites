import { Employee } from 'models/employeeModel';
import pool from '../config/database';
import { Restaurant } from '../models/restaurantModel';
import { Company } from 'models/companyModel';

const authenticateRestaurant = async (
  address: string,
  restaurantName: string,
  phoneNumber: number
): Promise<boolean> => {
  try {
    const [rows] = await pool.execute<Restaurant[]>(
      'SELECT * FROM Restaurant WHERE Address = ? AND Name = ? AND Phone = ?',
      [address, restaurantName, phoneNumber]
    );

    return rows.length > 0;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const authenticateEmployee = async (
  name: string,
  phoneNumber: Number
): Promise<Employee[]> => {
  try {
    const [rows] = await pool.execute<Employee[]>(
      'SELECT * FROM Employee WHERE Name = ? AND PhoneNumber = ?',
      [name, phoneNumber]
    );

    return rows
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const authenticateCompany = async (
  address: string,
  companyName: string,
  phoneNumber: Number
): Promise<boolean> => {
  try {
    const [rows] = await pool.execute<Company[]>(
      'SELECT * FROM Business WHERE Address = ? AND Name = ? AND Phone = ?',
      [address, companyName, phoneNumber]
    );

    return rows.length > 0;
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
};

const createRestaurant = async (
  address: string,
  restaurantName: string,
  phoneNumber: number
): Promise<boolean> => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Restaurant (Address, Name, Phone) VALUES (?, ?, ?)',
      [address, restaurantName, phoneNumber]
    );
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
};

/**
 * Creates a new company (Business) in the database.
 * Returns true on success, false on failure.
 */
const createCompany = async (
  address: string,
  companyName: string,
  phoneNumber: number
): Promise<boolean> => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Business (Address, Name, Phone) VALUES (?, ?, ?)',
      [address, companyName, phoneNumber]
    );
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
};

/**
 * Retrieves the Business.Id from the Business table by using the Business Name and Phone.
 * Returns the businessId or null if not found.
 */
const getBusinessIdByNameAndPhone = async (
  businessName: string,
  businessPhoneNumber: number
): Promise<number | null> => {
  try {
    const [rows] = await pool.execute<any[]>(
      'SELECT Id FROM Business WHERE Name = ? AND Phone = ?',
      [businessName, businessPhoneNumber]
    );
    if (rows.length > 0) {
      return rows[0].Id;
    }
    return null;
  } catch (error) {
    console.error('Database error:', error);
    return null;
  }
};

/**
 * Creates a new employee in the database.
 * Requires an existing businessId to link the employee to a company.
 * Returns true on success, false on failure.
 */
const createEmployee = async (
  name: string,
  preferences: string,
  dietaryNeeds: string,
  phoneNumber: number,
  businessId: number
): Promise<boolean> => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO Employee (Name, Preferences, Dietary_Needs, PhoneNumber, Business_Id) VALUES (?, ?, ?, ?, ?)',
      [name, preferences, dietaryNeeds, phoneNumber, businessId]
    );
    return true;
  } catch (error) {
    console.error('Database error:', error);
    return false;
  }
};

export { 
  authenticateRestaurant, 
  authenticateEmployee, 
  authenticateCompany, 
  createRestaurant, 
  createCompany,
  createEmployee,
  getBusinessIdByNameAndPhone
};