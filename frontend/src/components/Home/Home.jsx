import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Button } from "../ui/button";
import { FaArrowUp, FaWhatsapp } from "react-icons/fa"; // Import WhatsApp and ArrowUp icons
import LatestDesign from "./LatestDesign";
import HomeCarousel from "./HomeCarousel";
import Footer from "../utils/Footer";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Link } from "react-router-dom";
import TrendingCategory from "./TrendingCategory";

const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openWhatsApp = () => {
    window.open("https://wa.me/9012560340?text=Hello!", "_blank");
  };

  return (
    <>
      <div className="p-0 mt-5 sm:mt-0 sm:p-6 lg:p-10 bg-white relative">
        {/* <div className="mb-10 max-w-7xl mx-auto">
          <HomeCarousel />
        </div> */}
        <div className="mb-10 max-w-3xl mx-auto">
          
          <TrendingCategory/>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <LatestDesign />
        </div>
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="fixed bottom-4 left-4 p-3 rounded-full h-15 w-15"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </Button>

        <button
          onClick={openWhatsApp}
          variant="outline"
          className="fixed cursor-pointer bottom-4 right-5 p-3 rounded-full h-18 w-18 bg-green-500 text-white hover:bg-green-400"
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp size={30} />
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Home;
