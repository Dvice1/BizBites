import { Router } from 'express';
import { restaurantlogin, employeelogin, companylogin, restaurantSignup, employeeSignup, companySignup } from '../controllers/authController';
import { restaurantLoginValidationRules, employeeLoginValidationRules, companyLoginValidationRules } from '../validators/authValidator';
import { validate } from '../middlewares/validationMiddleware';

const router: Router = Router();

// POST /auth/restaurant-login
router.post('/restaurant-login', restaurantLoginValidationRules(), validate, restaurantlogin);

// POST /auth/login
router.post('/employee-login', employeeLoginValidationRules(), validate, employeelogin);
 
// POST /auth/login
router.post('/company-login', companyLoginValidationRules(), validate, companylogin);


// POST /auth/create-restaurant
router.post('/create-restaurant', restaurantSignup);

// POST /auth/create-employee
router.post('/create-employee', employeeSignup);
 
// POST /auth/create-company
router.post('/create-company', companySignup);


export default router;