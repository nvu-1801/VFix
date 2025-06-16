import { Product } from "../redux/features/products/productSlice";
import { CartItem } from "../redux/features/cart/cartSlice";

export const toCartItem = (product: Product): CartItem => ({
  productId: product.id,
  name: product.name,
  price: product.price,
  image: product.image,
  quantity: 1,
});
