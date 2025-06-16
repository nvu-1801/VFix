import { FastifyInstance } from 'fastify';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  clearAllProducts,
} from '../controllers/product.controller.js';

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', createProduct);
  fastify.get('/', getProducts);
  fastify.get('/:id', getProductById);
  fastify.put('/:id', updateProduct);
  fastify.delete('/:id', deleteProduct);
   fastify.delete('/clear-all', clearAllProducts);
}
