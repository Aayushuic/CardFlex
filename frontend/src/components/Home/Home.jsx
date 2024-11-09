import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles for responsive functionality
import { Button } from "../ui/button"; // Reusable Button component
import { FaArrowUp, FaWhatsapp } from "react-icons/fa"; // Importing icons for user interaction
import LatestDesign from "./LatestDesign"; // Component to display the latest designs
import HomeCarousel from "./HomeCarousel"; // Component for the home carousel
import Footer from "../utils/Footer"; // Footer component for the page
import TrendingCategory from "./TrendingCategory"; // Component for trending categories
import Reviews from "./Reviews";

const Home = () => {
  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Open WhatsApp chat function
  const openWhatsApp = () => {
    window.open("https://wa.me/9012560340?text=Hey! CardFlex", "_blank"); // Opens WhatsApp in a new tab
  };

  return (
    <>
      {/* Main content area */}
      <main className="p-0 mt-5 sm:mt-0 sm:p-6 lg:p-10 bg-white relative">
        {/* Home Carousel Section */}
        {/* <section className="mb-10 max-w-7xl mx-auto">
          <HomeCarousel /> 
        </section> */}

        {/* Trending Categories Section */}
        <section className="mb-10 max-w-3xl mx-auto" aria-labelledby="trending-categories">
          <h2 id="trending-categories" className="sr-only">Trending Categories</h2>
          <TrendingCategory /> {/* Component for displaying trending categories */}
        </section>

        {/* Latest Designs Section */}
        <section className="max-w-7xl mx-auto px-4" aria-labelledby="latest-designs">
          <h2 id="latest-designs" className="sr-only">Latest Designs</h2>
          <LatestDesign /> {/* Component for displaying the latest designs */}
        </section>

        <section className="max-w-7xl mx-auto px-4 mt-8" aria-labelledby="reviews">
          <h2 id="latest-designs" className="sr-only">Reviews</h2>
          <Reviews/> {/* Component for displaying the latest designs */}
        </section>


        {/* Floating Scroll to Top Button */}
        <Button
          onClick={scrollToTop} // Smoothly scrolls to the top of the page
          variant="outline"
          className="fixed bottom-4 left-4 p-3 rounded-full h-15 w-15"
          aria-label="Scroll to top" // Accessibility label for screen readers
        >
          <FaArrowUp size={24} /> {/* Scroll to top icon */}
        </Button>

        {/* Floating WhatsApp Contact Button */}
        <button
          onClick={openWhatsApp} // Opens WhatsApp chat when clicked
          className="fixed bottom-4 right-5 p-3 rounded-full h-18 w-18 bg-green-500 text-white hover:bg-green-400" // Styling for the button
          aria-label="Contact via WhatsApp" // Accessibility label for screen readers
        >
          <FaWhatsapp size={30} /> {/* WhatsApp icon */}
        </button>
      </main>

      {/* Footer component at the bottom of the page */}
      <Footer />
    </>
  );
};

export default Home;
