import { RowDataPacket } from 'mysql2';

export interface Employee extends RowDataPacket {
  id: string;
  name: string;
  phoneNumber: string;
  preferences: string;
  dietaryNeeds: string;
}