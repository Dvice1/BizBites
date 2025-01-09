import { body } from 'express-validator';

export const restaurantLoginValidationRules = () => {
  return [
    body('address').notEmpty().withMessage('Address is required'),
    body('restaurantName').notEmpty().withMessage('Restaurant name is required'),
    body('phoneNumber')
      .isMobilePhone('any')
      .withMessage('Phone number must match format xxx-xxx-xxxx'),
  ];
};

export const employeeLoginValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name is required'),
    body('phoneNumber')
      .isMobilePhone('any')
      .withMessage('Phone number must match format xxx-xxx-xxxx'),
  ];
};

export const companyLoginValidationRules = () => {
  return [
    body('address').notEmpty().withMessage('Address is required'),
    body('companyName').notEmpty().withMessage('Compnay name is required'),
    body('phoneNumber')
      .isMobilePhone('any')
      .withMessage('Phone number must match format xxx-xxx-xxxx'),
  ];
};

