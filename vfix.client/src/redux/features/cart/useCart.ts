import { useAppSelector } from '../../../hooks/hooks';
import { RootState } from '../../../store/store';

export const useCart = () => {
  const cartItems = useAppSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return {
    cartItems,
    totalQuantity,
    totalPrice,
  };
};
