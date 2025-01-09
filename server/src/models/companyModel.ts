import { RowDataPacket } from 'mysql2';

export interface Company extends RowDataPacket {
  id: string;
  address: string;
  companyName: string;
  phoneNumber: string;
}