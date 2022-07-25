import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { AppDataSource } from '..';
import { Product } from '../entity/Product';

// get request
const getAllProducts = asyncHandler(
  async (_: Request, res: Response, next: NextFunction) => {
    const productRepo = AppDataSource.getRepository(Product);
    const products = await productRepo.find();
    res.json(products);
    next();
  }
);

// post request
const createProducts = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, price, catagory, images, ratings } = req.body;
    const productRepo = AppDataSource.getRepository(Product);
    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    product.catagory = catagory;
    product.images = images;
    product.ratings = ratings;

    const createdProduct = await productRepo.save(product);
    res.json(createdProduct);
    next();
  }
);
export { getAllProducts, createProducts };
