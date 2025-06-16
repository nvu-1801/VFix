import { ShoppingCart, Utensils } from "lucide-react";
import { motion } from "framer-motion";
import { BannerImg } from "../../assets/images/index";

const textVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.5, duration: 0.6 },
  },
};

const imageVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.2, duration: 0.8 },
  },
};

const Carousel = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-12 px-6 overflow-hidden">
      {/* Text Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <span className="inline-block mb-4 bg-yellow-100 text-yellow-800 px-4 py-1 rounded-full text-sm font-medium shadow">
          CHECKING THE PROXY! 🌮
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-green-900 mb-4">
          Taste the Best that <br /> Surprise You
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          An effective advertising slogan gives an accurate picture of what your Fast Food Business is all about.
        </p>

        <div className="text-2xl font-bold text-green-800 mb-4">
          $15.00
          <span className="line-through text-gray-500 text-base ml-3">
            $25.00
          </span>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-yellow-700 px-6 py-2 rounded-full transition shadow-md">
            <ShoppingCart size={18} />
            Buy Now
          </button>
          <button className="flex items-center gap-2 bg-white border border-green-700 text-green-700 hover:bg-green-700 hover:text-teal px-6 py-2 rounded-full transition shadow-md">
            <Utensils size={18} />
            See Menu
          </button>
        </div>
      </motion.div>
       {/* Image Section */}
      <motion.div
        className="flex justify-center"
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <img
          src={BannerImg}
          alt="Plate"
          className="rounded-full w-[300px] h-[300px] md:w-[350px] md:h-[350px] object-cover border-4 border-gray-200 shadow-2xl"
        />
      </motion.div>
    </div>
  );
};

export default Carousel;
