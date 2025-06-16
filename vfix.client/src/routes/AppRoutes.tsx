import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CartPage from "@/pages/CartPage";
import ProductManager from "@/pages/ProductManagerPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ProductManager" element={<ProductManager />} />
      </Routes>
    </BrowserRouter>
  );
}
