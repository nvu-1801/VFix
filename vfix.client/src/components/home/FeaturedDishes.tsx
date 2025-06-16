// src/components/FeaturedDishes.tsx
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { motion, AnimatePresence } from "framer-motion";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
  fetchProducts,
  selectProducts,
} from "../../redux/features/products/productSlice";

const getWrappedIndex = (index: number, length: number) => {
  return (index + length) % length;
};

const FeaturedDishes = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const [centerIndex, setCenterIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const prev = () => {
    setDirection("left");
    setCenterIndex((prev) => getWrappedIndex(prev - 1, products.length));
  };

  const next = () => {
    setDirection("right");
    setCenterIndex((prev) => getWrappedIndex(prev + 1, products.length));
  };

  const getDish = (offset: number) =>
    products[getWrappedIndex(centerIndex + offset, products.length)];
  const variants = {
    enter: (direction: "left" | "right") => ({
      x: direction === "right" ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    exit: (direction: "left" | "right") => ({
      x: direction === "right" ? -300 : 300,
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.4 },
    }),
  };

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div className="relative max-w-7xl mx-auto py-20 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-green-900">
        Featured Dishes
      </h2>

      <div className="flex items-center justify-center gap-6 relative">
        {/* Prev Button */}
        <button
          onClick={prev}
          className="absolute left-0 z-10 bg-white shadow-md rounded-full p-3 hover:bg-green-100 transition"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Left Dish */}
        <div className="bg-green-100 p-4 rounded-xl w-48 h-64 flex flex-col items-center opacity-70 scale-90">
          <img
            // src={getDish(-1).image}
            alt={getDish(-1).name}
            className="w-20 h-20 object-cover rounded-full mb-2"
          />
          <h3 className="font-semibold">{getDish(-1).name}</h3>
          <p className="text-green-800 font-bold">{getDish(-1).price}</p>
        </div>

        {/* Animated Center Dish */}
        <div className="w-64 h-80 relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={centerIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 bg-gradient-to-tr from-yellow-100 to-green-50 p-6 rounded-2xl shadow-xl flex flex-col items-center justify-center"
            >
              <img
                src={getDish(0).image}
                alt={getDish(0).name}
                className="w-32 h-32 object-cover rounded-full mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold text-green-900">
                {getDish(0).name}
              </h3>
              <p className="text-green-700 text-lg font-bold">
                {getDish(0).price}
              </p>
              <p className="text-sm text-gray-500 mt-2">Best Seller</p>
              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      productId: getDish(0).id,
                      name: getDish(0).name,
                      price: getDish(0).price,
                      quantity: 1,
                    })
                  )
                }
                className="mt-3 shadow-md bg-gray hover:bg-green-700 text-yellow-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm transition"
              >
                <ShoppingCart size={16} />
                Buy Now
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Dish */}
        <div className="bg-green-100 p-4 rounded-xl w-48 h-64 flex flex-col items-center opacity-70 scale-90">
          <img
            // src={getDish(1).image}
            alt={getDish(1).name}
            className="w-20 h-20 object-cover rounded-full mb-2"
          />
          <h3 className="font-semibold">{getDish(1).name}</h3>
          <p className="text-green-800 font-bold">{getDish(1).price}</p>
        </div>

        {/* Next Button */}
        <button
          onClick={next}
          className="absolute right-0 z-10 bg-white shadow-md rounded-full p-3 hover:bg-green-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default FeaturedDishes;
