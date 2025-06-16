import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/redux/features/cart/useCart";
import CartDropdown from "./CartDropdown";
import { Link } from "react-router-dom";
import ProductManagerPage from "@/pages/ProductManagerPage";

export default function Header() {
  const { cartItems, totalQuantity } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [cartHover, setCartHover] = useState(false);

  const handleSearch = () => {
    const query = document.querySelector("input")?.value || "";
    if (query.trim() !== "") {
      console.log(`Searching for: ${query}`);
    }
  };

  return (
    <header className="sticky top-0 bg-white rounded-xl shadow-sm px-6 py-4 flex justify-center items-center relative z-50">
      {/* Mobile Menu Button – chỉ hiện ở mobile */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute left-4 md:hidden text-gray-800 text-2xl focus:outline-none"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Logo ở giữa */}
      <div className="text-2xl font-bold text-green-800">
        F<span className="">oodiee</span>
      </div>

      {/* Desktop Nav – chỉ hiện ở md trở lên */}
      <nav className="absolute left-4 hidden md:flex gap-x-6 text-gray-700 font-medium">
        <a href="#" className="hover:text-green-700">
          Home
        </a>
        <a href="#" className="hover:text-green-700">
          Menu
        </a>
        <a href="#" className="hover:text-green-700">
          About
        </a>
        <a href="#" className="hover:text-green-700">
          Contact
        </a>
        <Link
          to="/ProductManager"
        >
          Product Manager
        </Link>
      </nav>

      {/* Right Side */}
      <div className="absolute right-4 flex items-center gap-3">
        <div className="ps-6"></div>
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block px-4 py-1 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <div className="hidden md:block" onClick={handleSearch}>
          🔍
        </div>
        <button
          onClick={() => navigate("/login")}
          className="hidden md:block !bg-green-600 text-white px-4 py-1 rounded-md hover:!bg-green-700 transition"
        >
          Login
        </button>

        {/* Cart */}
        <div
          className="relative"
          onMouseEnter={() => setCartHover(true)}
          onMouseLeave={() => setCartHover(false)}
        >
          <button
            onClick={() => navigate("/cart")}
            className="!bg-blue-500 text-white px-4 py-1 rounded-md hover:!bg-blue-700 transition flex items-center gap-2 relative"
          >
            <FaShoppingCart size={18} />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 !bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalQuantity}
              </span>
            )}
            Giỏ hàng
          </button>
          {cartHover && cartItems.length > 0 && (
            <CartDropdown cartItems={cartItems} onClose={setCartHover} />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md px-6 py-4 flex flex-col space-y-4 md:hidden">
          <Link to="/" className="hover:text-green-700">
            Home
          </Link>
          <Link to="#" className="hover:text-green-700">
            Menu
          </Link>
          <Link to="#" className="hover:text-green-700">
            About
          </Link>
          <Link to="#" className="hover:text-green-700">
            Contact
          </Link>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 text-white px-4 py-1 rounded-md hover:!bg-green-700"
          >
            Sign In
          </button>
        </div>
      )}
    </header>
  );
}
