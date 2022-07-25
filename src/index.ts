import 'reflect-metadata';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from './entity/Product';
import morgan from 'morgan';

dotenv.config();
const app: Application = express();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [Product],
  subscribers: [],
  migrations: [],
});

(async function main() {
  try {
    await AppDataSource.initialize();
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on ${port}`));
