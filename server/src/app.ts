import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes';
import getRoutes from './routes/getRoutes';
import deleteRoutes from './routes/deleteRoutes'
import addRoutes from './routes/addRoutes';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config();

const app: Application = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/get', getRoutes);
app.use('/delete', deleteRoutes);
app.use('/add', addRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
