import express from 'express';
import sequelize from './config/database';
import authRoutes from './routes/auth';
import consultationRoutes from './routes/consultations';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/consultations', consultationRoutes);

// Connect to the database and start the server
sequelize.sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
