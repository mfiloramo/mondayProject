import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();


const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_USER: string | undefined = process.env.DB_USER;
const DB_HOST: string | undefined = process.env.DB_HOST;
const DB_PASS: string | undefined = process.env.DB_PASS;

const options: object = {
  host: DB_HOST,
  dialect: 'mssql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export const sequelize: Sequelize = new Sequelize(DB_NAME!, DB_USER!, DB_PASS!, options);
