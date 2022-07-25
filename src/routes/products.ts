import express from 'express';
import { createProducts, getAllProducts } from '../controllers/products';

const router = express.Router();

router.route('/').get(getAllProducts).post(createProducts);

export default router;
