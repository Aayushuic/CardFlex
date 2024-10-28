import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Carousel as ResponsiveCarousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Flame } from "lucide-react";

const TrendingCategory = () => {
  const categories = [
    { title: "Shop Banner", link: "/category/banner/shop-banner" },
    { title: "Poster", link: "/category/template/poster" },
    { title: "Bill Book", link: "/category/invoice/bill-book" },
    { title: "Id Card", link: "/category/id-card/employee" },
  ];

  const isMobileOrTablet = window.matchMedia("(max-width: 1024px)").matches; // Use this for both mobile and tablet views

  return (
    <div className="mb-10 max-w-3xl mx-auto">
      {isMobileOrTablet ? (
        <ResponsiveCarousel
          showArrows={false}
          showThumbs={false}
          autoPlay
          interval={2000}
          infiniteLoop
          showStatus={false} // Hide status
          showIndicators={false} // Hide dots
        >
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center w-full">
              <Link to={category.link} className="w-full relative">
                <Button variant="outline" className="w-full rounded-full">
                  {category.title}
                  <span className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-2 py-1 shadow-lg flex items-center">
                    <Flame className="h-4 w-4 mr-1" /> {/* Lucide Flame icon */}
                  </span>
                </Button>
              </Link>
            </div>
          ))}
        </ResponsiveCarousel>
      ) : (
        <Carousel>
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem key={index} className="w-full sm:w-1/2 md:basis-1/2 lg:basis-1/2">
                <Link to={category.link} className="w-full relative">
                  <Button variant="outline" className="w-full rounded-full">
                    {category.title}
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-full px-2 py-1 shadow-lg flex items-center">
                      <Flame className="h-4 w-4 mr-1" /> {/* Lucide Flame icon */}
                    </span>
                  </Button>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Position Previous Button */}
          <CarouselPrevious />

          {/* Position Next Button */}
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default TrendingCategory;
