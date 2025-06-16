import { motion } from "framer-motion";
import { Mattcha2 } from "../../assets/images/index";

export default function MilkTeaSection() {
  return (
    <section className="py-16 bg-[#fef9f4] rounded-xl overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center gap-8">
          {/* Left Text */}
          <motion.div
            className="text-right pr-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              Why Everyone Loves Milk Tea
            </h2>
            <p className="text-gray-600 text-lg">
              Milk tea combines the bold taste of tea with the creamy sweetness
              of milk. It's refreshing, energizing, and comforting—all in one cup.
            </p>
          </motion.div>

          {/* Center Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3  }}
            viewport={{ once: true }}
          >
            <img
              src={Mattcha2}
              alt="Milk Tea"
              className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-pink-200"
            />
          </motion.div>

          {/* Right Text */}
          <motion.div
            className="text-left pl-6"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3  }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-green-900 mb-4">
              A Drink That Brings Joy
            </h2>
            <p className="text-gray-600 text-lg">
              With toppings like boba, jelly, and pudding, milk tea becomes an
              adventure. There's a reason it's a global favorite!
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
