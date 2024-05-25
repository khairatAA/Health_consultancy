import { Sequelize } from 'sequelize-typescript';
import { Patient } from '../models/Patient';
import { Consultation } from '../models/Consultation';
import { User } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  models: [User, Patient, Consultation], // Add all your models here
});

export default sequelize;