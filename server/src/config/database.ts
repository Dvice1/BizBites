import mysql, { Pool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

//gets the MYSQL database that has all our tables
const pool: Pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

//function to test connection
//I had to add my public IP to GCP
async function testConnection() {
  try {
      const connection = await pool.getConnection();
      console.log('Database connected successfully');
      connection.release();
  } catch (error) {
      console.error('Error connecting to the database:', error);
  }
}
testConnection();

export default pool;