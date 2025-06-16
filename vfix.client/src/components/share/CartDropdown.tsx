import { useNavigate } from "react-router-dom";

export default function CartDropdown({ cartItems, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="absolute right-0 mt-0 w-72 max-h-80 overflow-auto bg-white rounded-md shadow-lg border border-gray-200 z-50">
      <ul>
        {cartItems.map((item) => (
          <li
            key={item.productId}
            className="flex items-center gap-3 px-4 py-2 border-b last:border-none"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold truncate">{item.name}</p>
              <p className="text-xs text-gray-500">
                {item.quantity} x ${item.price}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="text-center py-2 border-t">
        <button
          onClick={() => navigate("/cart")}
          className="!bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 transition"
        >
          Xem giỏ hàng
        </button>
      </div>
    </div>
  );
}
