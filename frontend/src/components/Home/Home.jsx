import React from "react";
import { Helmet } from "react-helmet"; // Import Helmet for SEO metadata management
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles for responsive functionality
import { Button } from "../ui/button"; // Reusable Button component
import { FaArrowUp, FaWhatsapp } from "react-icons/fa"; // Importing icons for user interaction
import LatestDesign from "./LatestDesign"; // Component to display the latest designs
import HomeCarousel from "./HomeCarousel"; // Component for the home carousel
import Footer from "../utils/Footer"; // Footer component for the page
import TrendingCategory from "./TrendingCategory"; // Component for trending categories
import Reviews from "./Reviews";
import WhyChooseCardFlex from "./WhyChooseCardFlex";
import { motion } from "framer-motion";

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
      <Helmet>
        <title>CardFlex - Home</title>
        <meta
          name="description"
          content="Download free CDR files including wedding cards, visiting cards, and more. Explore creative designs and trending categories for every occasion at CardFlex."
        />
        <meta
          name="keywords"
          content="Free CDR files,cdr files, CDR file download, wedding card CDR files, visiting card designs, CardFlex, trending card designs, free creative cards, custom design,free hindi design, free cdr files,cdr files, CDR files"
        />
        <meta name="author" content="CardFlex" />
        <meta property="og:title" content="CardFlex - Home" />
        <meta
          property="og:description"
          content="Discover and download free CDR files for wedding cards, visiting cards, and creative designs. Your one-stop solution for free card templates."
        />
        <meta property="og:url" content="https://cardflex.in/" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://cardflex.in/preview-image.jpg"
        />
        <link rel="canonical" href="https://cardflex.in/" />
      </Helmet>

      {/* Main content area */}
      <main className="p-0 mt-5 sm:mt-0 sm:p-6 lg:p-10 bg-white relative">
        {/* Home Carousel Section */}
        {/* <section className="mb-10 max-w-7xl mx-auto" aria-labelledby="home-carousel">
          <h2 id="home-carousel" className="sr-only">Home Carousel</h2>
          <HomeCarousel />
        </section> */}

        {/* Trending Categories Section */}
        <section
          className="mb-10 max-w-3xl mx-auto"
          aria-labelledby="trending-categories"
        >
          <h2 id="trending-categories" className="sr-only">
            Trending Categories
          </h2>
          <TrendingCategory />
        </section>

        {/* Latest Designs Section */}
        <section
          className="max-w-7xl mx-auto px-4"
          aria-labelledby="latest-designs"
        >
          <h2 id="latest-designs" className="sr-only">
            Latest Designs
          </h2>
          <LatestDesign />
        </section>

        {/* Reviews Section */}

        <motion.div
          key={2}
          initial={{ opacity: 0, x: 100 }} // Start with opacity 0 and slightly below
          whileInView={{ opacity: 1, x: 0 }} // Fade in and slide up
          transition={{ duration: 2, ease: "easeIn" }} // Smooth transition
          viewport={{ once: true }} // Trigger once when entering the viewport
        >
          <section
            className="max-w-7xl mx-auto px-4 mt-8"
            aria-labelledby="reviews"
          >
            <h2 id="reviews" className="sr-only">
              Reviews
            </h2>
            <Reviews />
          </section>
        </motion.div>

        <motion.div
          key={2}
          initial={{ opacity: 0, x: -100 }} // Start with opacity 0 and slightly below
          whileInView={{ opacity: 1, x: 0 }} // Fade in and slide up
          transition={{ duration: 2, ease: "easeIn" }} // Smooth transition
          viewport={{ once: true }} // Trigger once when entering the viewport
        >
          <section
            className="max-w-7xl mx-auto px-4 mt-8"
            aria-labelledby="reviews"
          >
            <h2 id="reviews" className="sr-only"></h2>
            <WhyChooseCardFlex />
          </section>
        </motion.div>

        {/* Floating Scroll to Top Button */}
        <Button
          onClick={scrollToTop}
          variant="outline"
          className="fixed bottom-4 left-4 p-3 rounded-full h-15 w-15"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={24} />
        </Button>

        {/* Floating WhatsApp Contact Button */}
        <button
          onClick={openWhatsApp}
          className="fixed bottom-4 right-5 p-3 rounded-full h-18 w-18 bg-green-500 text-white hover:bg-green-400"
          aria-label="Contact via WhatsApp"
        >
          <FaWhatsapp size={30} />
        </button>
      </main>

      {/* Footer component at the bottom of the page */}
      <Footer />
    </>
  );
};

export default Home;
