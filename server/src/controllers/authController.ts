import { Request, Response, NextFunction } from 'express';
import { 
  authenticateCompany, 
  authenticateEmployee, 
  authenticateRestaurant, 
  createRestaurant,
  createEmployee,
  createCompany,
  getBusinessIdByNameAndPhone 
} from '../services/authService';

const restaurantlogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, restaurantName, phoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format', verified: false });
      return;
    }

    const restaurantExists = await authenticateRestaurant(
      address,
      restaurantName,
      numericPhoneNumber
    );

    if (!restaurantExists) {
      res.status(404).json({ error: 'No restaurant registered with that information', verified: false });
    } else {
      res.status(200).json({ message: 'Login successful', verified: true });
    }
  } catch (error) {
    next(error);
  }
};

const employeelogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { name, phoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format', verified: false });
      return;
    }

    const employee = await authenticateEmployee(
      name,
      numericPhoneNumber
    );

    if (employee.length === 0) {
      res.status(404).json({ error: 'No employee registered with that information', verified: false });
    } else {
      res.status(200).json({ message: 'Login successful', verified: true , token: employee[0].Id}); 
    }
  } catch (error) {
    next(error);
  }
};

const companylogin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, companyName, phoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format', verified: false });
      return;
    }

    const companyExists = await authenticateCompany(
      address,
      companyName,
      numericPhoneNumber
    );

    if (!companyExists) {
      res.status(404).json({ error: 'No company registered with that information', verified: false });
    } else {
      res.status(200).json({ message: 'Login successful', verified: true });
    }
  } catch (error) {
    next(error);
  }
};

const restaurantSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, restaurantName, phoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format', verified: false });
      return;
    }

    // Check if restaurant already exists
    const restaurantExists = await authenticateRestaurant(
      address,
      restaurantName,
      numericPhoneNumber
    );

    if (restaurantExists) {
      res.status(409).json({ error: 'Restaurant already registered', verified: false });
      return;
    }

    // Create the new restaurant
    const newRestaurant = await createRestaurant(
      address,
      restaurantName,
      numericPhoneNumber
    );

    if (!newRestaurant) {
      res.status(500).json({ error: 'Failed to create restaurant', verified: false });
    } else {
      res.status(201).json({ message: 'Restaurant created successfully', verified: true });
    }

  } catch (error) {
    next(error);
  }
};

const employeeSignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Expected fields: name, preferences, dietaryNeeds, phoneNumber, businessName, businessPhoneNumber
    const { name, phoneNumber, preferences, dietaryNeeds, businessName, businessPhoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);
    const numericBusinessPhoneNumber = Number(businessPhoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format for employee', verified: false });
      return;
    }

    if (isNaN(numericBusinessPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format for business', verified: false });
      return;
    }

    // Find the business ID using the provided businessName and businessPhoneNumber
    const businessId = await getBusinessIdByNameAndPhone(businessName, numericBusinessPhoneNumber);

    if (!businessId) {
      res.status(404).json({ error: 'No business found with the provided name and phone number', verified: false });
      return;
    }

    const employeeExists = await authenticateEmployee(name, numericPhoneNumber);
    if (employeeExists.length > 0) {
      res.status(409).json({ error: 'Employee already registered', verified: false });
      return;
    }

    // Create the employee
    const newEmployee = await createEmployee(name, preferences, dietaryNeeds, numericPhoneNumber, businessId);

    if (!newEmployee) {
      res.status(500).json({ error: 'Failed to create employee', verified: false });
    } else {
      res.status(201).json({ message: 'Employee created successfully', verified: true });
    }
  } catch (error) {
    next(error);
  }
};

const companySignup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { address, companyName, phoneNumber } = req.body;
    const numericPhoneNumber = Number(phoneNumber);

    if (isNaN(numericPhoneNumber)) {
      res.status(400).json({ error: 'Invalid phone number format', verified: false });
      return;
    }

    const companyExists = await authenticateCompany(
      address,
      companyName,
      numericPhoneNumber
    );

    if (companyExists) {
      res.status(409).json({ error: 'Company already registered', verified: false });
      return;
    }

    // Create the company
    const newCompany = await createCompany(address, companyName, numericPhoneNumber);

    if (!newCompany) {
      res.status(500).json({ error: 'Failed to create company', verified: false });
    } else {
      res.status(201).json({ message: 'Company created successfully', verified: true });
    }
  } catch (error) {
    next(error);
  }
};

export { restaurantlogin, employeelogin, companylogin, restaurantSignup, employeeSignup, companySignup };
