import 'reflect-metadata';
import express, { Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import morgan from 'morgan';
import productsRoute from './routes/products';
import errorHandler from './middleware/errorHandler';

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
  logging: process.env.NODE_ENV === 'development',
  entities: [__dirname + '/entity/*.ts'],
  subscribers: [],
  migrations: [],
});

(async () => {
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

app.use('/api/products', productsRoute);

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is listening on ${port}`));
