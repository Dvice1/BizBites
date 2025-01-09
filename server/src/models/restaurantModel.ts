import { RowDataPacket } from 'mysql2';

export interface Restaurant extends RowDataPacket {
  id: number;
  address: string;
  restaurantName: string;
  phoneNumber: string;
}
export interface Food extends RowDataPacket {
  id: number;
  name: string;
  price: number;
  calories: number;
  restaurant: string;
}

export interface Business extends RowDataPacket {
  id: number;
  address: string;
  name: string;
  phone: number;
}

export interface Deals extends RowDataPacket {
  r_id: number;
  b_id: number;
  discount: number;
}

export interface Employees extends RowDataPacket {
  id: number;
  name: string;
  preferences: string;
  dietary_needs: string;
  phone: number;
}

export interface Orders extends RowDataPacket {
  o_id: number;
  e_id: number;
  order_date: string;
  f_ids: string;
}

export interface FoodStatistics extends RowDataPacket {
  food_category: string;
  avg_calories: number;
  avg_protein: number;
  item_count: number;
  avg_price: number;
}

export interface HealthyOptionsStats extends RowDataPacket {
  food_category: string;
  Total_Items: number;
  Avg_Protein_Grams: number;
  Avg_Calories: number;
  Avg_Protein_Calorie_Ratio: number;
  Min_Price: number;
  Max_Price: number;
  Protein_Price_Value: number;
}

export interface HighValueMealDeals extends RowDataPacket {
  Restaurant_Name: string;
  Avg_Discount: number;
  Menu_Categories: number;
  Avg_Price: number;
}

export interface BusinessDealAdvantages extends RowDataPacket {
  Name: string;
  restaurant_deals: number;
  avg_discount: number;
  premium_deals: number;
}