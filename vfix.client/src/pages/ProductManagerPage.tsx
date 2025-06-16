import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import {
  fetchProducts,
  selectProducts,
  Product,
} from "../redux/features/products/productSlice";

import Header from "@/components/share/Header";
import Footer from "@/components/share/Footer";

const ITEMS_PER_PAGE = 10;

export default function ProductManagerPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [form, setForm] = useState<Omit<Product, "_id" | "image">>({
    name: "",
    price: 0,
    category: "",
    description: "",
  });

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_BASE_URL}/products/${editingId}`,
          form
        );
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/products`, form);
      }
      setForm({ name: "", price: 0, category: "", description: "" });
      setEditingId(null);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setForm({
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });
    const id = product._id ?? product.id;
    if (id) {
      setEditingId(id);
    } else {
      console.warn("Product ID is missing in handleEdit", product);
    }

    // 🟢 Cuộn lên đầu trang để người dùng thấy form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center !bg-green-50 p-4">
      <div className="w-full ">
        <div className="p-5">
          <Header />
        </div>
        <h1 className="text-3xl text-green-600 font-bold mb-6 text-center">
          Product Manager
        </h1>

        <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-2xl text-yellow-600 font-bold col-span-full text-center">
            {editingId ? "Edit Product" : "Add Product"}
          </h4>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="border p-2 rounded text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Price
            </label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="border p-2 rounded text-black"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              name="category"
              value={form.category}
              onChange={handleChange}
              placeholder="Enter category"
              className="border p-2 rounded text-black"
            />
          </div>

          <div className="flex flex-col col-span-full">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows={3}
              className="border p-2 rounded text-black"
            />
          </div>

          <div className="flex gap-2 col-span-full justify-center">
            <Button
              onClick={handleSubmit}
              className="!bg-blue-600 hover:!bg-blue-700 text-white"
            >
              {editingId ? "Update Product" : "Add Product"}
            </Button>

            {editingId && (
              <Button
                onClick={() => {
                  setEditingId(null);
                  setForm({
                    name: "",
                    price: 0,
                    category: "",
                    description: "",
                  });
                }}
                className="!bg-gray-500 hover:!bg-gray-600 text-white"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Product list */}
        <div className="space-y-4  max-w-2xl mx-auto">
          {paginatedProducts.map((product) => (
            <div
              key={product._id}
              className="!bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <h2 className="text-xl font-bold text-green-700">
                  {product.name}
                </h2>
                <p className="text-sm text-gray-700">
                  {product.category} -{" "}
                  <span className="font-medium text-green-800">
                    {product.price.toLocaleString()}₫
                  </span>
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {product.description}
                </p>
              </div>
              <div className="flex gap-2 mt-2 sm:mt-0">
                <Button
                  onClick={() => handleEdit(product)}
                  className="!bg-yellow-500 hover:!bg-yellow-600 text-white"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(product._id!)}
                  className="!bg-red-600 hover:!bg-red-700 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <Button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="!bg-gray-300 hover:!bg-gray-400 text-black"
            >
              Previous
            </Button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="!bg-gray-300 hover:!bg-gray-400 text-black"
            >
              Next
            </Button>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
