import React from "react";
import { Card } from "../Card/Card";
import { useSelector } from "react-redux";
import UseGetLatestProduct from "@/hooks/UseGetLatestProduct";
import CardSkeleton from "../Card/cardSkeleton";
import { motion } from "framer-motion";

const LatestDesign = () => {
  const products = useSelector((state) => state.product.latestProducts);
  UseGetLatestProduct();

  return (
    <section aria-labelledby="latest-design-heading">
      <h2
        id="latest-design-heading"
        className="text-xl font-bold mb-4 text-center text-[#1B3C73]"
      >
        Latest Designs
      </h2>
      <motion.div
        key={2}
        initial={{ opacity: 0, y: 100 }} // Start with opacity 0 and slightly below
        whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
        transition={{ duration: 1.3, ease: "easeOut" }} // Smooth transition
        viewport={{ once: true }} // Trigger once when entering the viewport
      >
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          role="list"
          aria-live="polite"
        >
          {products.length === 0
            ? Array.from({ length: 9 }).map((_, idx) => (
                <CardSkeleton key={idx} />
              ))
            : products.map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 100 }} // Start with opacity 0 and slightly below
                  whileInView={{ opacity: 1, y: 0 }} // Fade in and slide up
                  transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
                  viewport={{ once: true }} // Trigger once when entering the viewport
                >
                  <Card
                    key={product._id}
                    _id={product._id}
                    imageSrc={product.imageUrl}
                    title={product.title}
                    oldPrice={product.oldPrice}
                    newPrice={product.newPrice}
                    description={product.description}
                    cdrFile={product.cdrFile}
                  />
                </motion.div>
              ))}
        </div>
      </motion.div>
    </section>
  );
};

export default LatestDesign;
