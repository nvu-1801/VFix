import { useCart } from "@/redux/features/cart/useCart";
import { useAppDispatch } from "@/hooks/hooks";
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "@/redux/features/cart/cartSlice";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/share/Header";
import Footer from "@/components/share/Footer";

const CartPage = () => {
  const { cartItems, totalPrice } = useCart();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleIncrease = (id: string) => {
    const item = cartItems.find((i) => i.productId === id);
    if (item) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find((i) => i.productId === id);
    if (item && item.quantity > 1) {
      dispatch(addToCart({ ...item, quantity: -1 }));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col bg-green-50">
      <div className="p-5">
      <Header />
      </div>

      <main className="flex-1 flex justify-center px-4 py-10">
        <div className="w-full max-w-4xl !bg-white p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-green-900 text-center">
            🛒 Your Cart
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-center">Your cart is empty.</p>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between border-b pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <h2 className="font-semibold text-yellow-500 text-lg">
                          {item.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {item.price.toLocaleString()}₫ x {item.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.productId)}
                        className="!bg-gray-300 p-2 rounded hover:!bg-gray-400"
                      >
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => handleIncrease(item.productId)}
                        className="!bg-gray-300 p-2 rounded hover:!bg-gray-400"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item.productId))
                        }
                        className="!bg-red-100 p-2 rounded hover:!bg-red-200"
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-between items-center">
                <p className="text-xl font-bold text-green-900">
                  Total: {totalPrice.toLocaleString()}₫
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => dispatch(clearCart())}
                    className="!bg-gray-400 px-4 py-2 rounded-md hover:!bg-gray-500"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="!bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
