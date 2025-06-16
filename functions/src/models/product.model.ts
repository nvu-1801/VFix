// src/models/product.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  image?: string;
  price: number;
  description?: string;
  stock?: number;
  category?: string;
  createdAt?: Date;
}

const productSchema: Schema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: String,
  description: String,
  stock: { type: Number, default: 0 },
  category: String,
  createdAt: { type: Date, default: Date.now },
}, {
  toJSON: {
    virtuals: true,
    transform: (_, ret) => {
      ret.id = ret._id;
      if (ret.image && !ret.image.startsWith('http')) {
        ret.image = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${ret.image}`;
      }
      delete ret._id;
      delete ret.__v;
    }
  }
});

export default mongoose.model<IProduct>('Product', productSchema);
