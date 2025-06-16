import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Chỉ chạy một lần khi vào viewport
    threshold: 0.2, // Kích hoạt khi 20% footer xuất hiện trên màn hình
  });

  return (
    <motion.footer
      ref={ref}
      initial={{ y: 100, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-emerald-500 rounded-xl text-white py-10 px-6 mt-16"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Intro */}
        <div>
          <h2 className="text-2xl font-bold mb-3">VFix Foods</h2>
          <p className="text-sm">
            Bringing delicious meals and joyful experiences to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Menu</a></li>
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">FAQ</a></li>
            <li><a href="#" className="hover:underline">Help Center</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#" className="hover:underline">Terms of Service</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a href="#"><FaFacebook className="hover:text-blue-400" /></a>
            <a href="#"><FaInstagram className="hover:text-pink-400" /></a>
            <a href="#"><FaTwitter className="hover:text-sky-400" /></a>
            <a href="#"><FaYoutube className="hover:text-red-500" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-white/20 pt-6 text-center text-sm text-white/80">
        © {new Date().getFullYear()} VFix Foods. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
