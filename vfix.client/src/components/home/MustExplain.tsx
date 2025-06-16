import { Star, ShoppingCart, Eye, ArrowRight, ArrowLeft } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchProducts,
  selectProducts,
} from "../../redux/features/products/productSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useEffect, useState } from "react";
import { toCartItem } from "@/utils/toCartItem";

const MustExplain = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 4;
  const totalPages = Math.ceil(products.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  const enhancedProducts = products.map((item) => ({
    ...item,
    rating: Math.floor(Math.random() * 2) + 4,
  }));

  const paginated = products.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage
  );

  const variants = {
    enter: (page: number) => ({
      x: page > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
    exit: (page: number) => ({
      x: page > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4 },
    }),
  };
  return (
    <div className="relative mt-16 px-4">
      <h2 className="text-2xl font-semibold text-green-900 mb-6 flex items-center gap-2">
        <Eye className="text-green-700" size={22} />
        Must Explain
      </h2>

      {/* Nút Prev */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 0}
        className="absolute -left-1 top-[60%] -translate-y-1/2 z-10 bg-white border border-green-600 text-green-600 p-3 rounded-full shadow hover:bg-green-100 disabled:opacity-40"
      >
        <ArrowLeft size={20} />
      </button>

      {/* Danh sách sản phẩm */}
      <div className="flex items-center justify-center gap-6 relative overflow-hidden">
        <AnimatePresence mode="wait" custom={currentPage}>
          <motion.div
            key={currentPage}
            custom={currentPage}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="flex gap-5"
          >
            {paginated.map((item) => (
              <div
                key={item._id}
                className="bg-white w-[280px] rounded-xl shadow-md h-80 p-4 flex flex-col items-center text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 my-5 rounded-full object-cover mb-3 border-4 border-green-100 shadow"
                />
                <h3 className="font-semibold text-lg text-green-800">
                  {item.name}
                </h3>
                <p className="text-lg font-bold text-green-700">
                  {item.price}₫
                </p>
                {/* <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                  <Star size={14} className="fill-yellow-500 text-yellow-500" />
                  {item.description}
                </div> */}
                <div className="flex items-center gap-1 text-sm text-yellow-600 mt-1">
                  {Array.from({
                    length: Math.floor(Math.random() * 2) + 4,
                  }).map((_, index) => (
                    <Star
                      key={index}
                      size={14}
                      className="fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <button
                  onClick={() => dispatch(addToCart(toCartItem(item)))}
                  className="mt-3 shadow-md bg-gray hover:bg-green-700 text-yellow-600 px-4 py-2 rounded-full flex items-center gap-2 text-sm transition"
                >
                  <ShoppingCart size={16} />
                  Buy Now
                </button>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nút Next */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages - 1}
        className="absolute -right-1 top-[60%] -translate-y-1/2 z-10 bg-white border border-green-600 text-green-600 p-3 rounded-full shadow hover:bg-green-100 disabled:opacity-40"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
};

export default MustExplain;
