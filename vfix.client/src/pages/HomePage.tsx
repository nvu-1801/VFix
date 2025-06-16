import Header from "../components/share/Header";
import MilkTeaSection from "../components/home/MilkTeaSection";
import FeaturedDishes  from "../components/home/FeaturedDishes";
import Carousel from "../components/home/Banner";
import CardProduct from "../components/home/MustExplain";
import Footer from "../components/share/Footer";

export default function HomePage() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-green-100 to-green-300 p-8 text-gray-800">
      {/* Navbar */}
      <Header />
      {/* Hero Section */}
      <Carousel />
       {/* FeaturedDishes */}
      <FeaturedDishes />
      {/* MilkTeaSection */}
      <MilkTeaSection />
      {/* Recommended Items */}
      <CardProduct />
       {/* Footer */}
      <Footer />
    </div>
  );
}
