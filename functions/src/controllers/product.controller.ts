import { FastifyRequest, FastifyReply } from 'fastify';
import Product, { IProduct } from '../models/product.model.js';

// CREATE
export const createProduct = async (
  request: FastifyRequest<{ Body: IProduct }>,
  reply: FastifyReply
) => {
  try {
    const product = new Product(request.body);
    const saved = await product.save();
    reply.code(201).send(saved);
  } catch (err: any) {
    console.error("❌ Product Creation Error:", err.message);
    reply.code(400).send({ error: err.message });
  }
};

// READ ALL
export const getProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const products = await Product.find();
    reply.code(200).send(products);
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};

// READ ONE
export const getProductById = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) return reply.code(404).send({ message: 'Product not found' });
    reply.code(200).send(product);
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};

// UPDATE
export const updateProduct = async (
  request: FastifyRequest<{ Params: { id: string }; Body: Partial<IProduct> }>,
  reply: FastifyReply
) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    );
    if (!updated) return reply.code(404).send({ message: 'Product not found' });
    reply.code(200).send(updated);
  } catch (err: any) {
    reply.code(400).send({ error: err.message });
  }
};

// DELETE
export const deleteProduct = async (
  request: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const deleted = await Product.findByIdAndDelete(request.params.id);
    if (!deleted) return reply.code(404).send({ message: 'Product not found' });
    reply.code(200).send({ message: 'Deleted successfully' });
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};

// clearAllProducts
export const clearAllProducts = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    await Product.deleteMany({});
    reply.code(200).send({ message: 'All products deleted successfully' });
  } catch (err: any) {
    reply.code(500).send({ error: err.message });
  }
};