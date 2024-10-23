import React from "react";
import { Card } from "../Card/Card";

const arr = [1, 2, 3, 4, 5];

const Category = ({formattedHeading,products}) => {

  return (
    <div className="max-w-7xl mx-auto mt-6 px-4">
      {/* Page heading */}
      <h1 className="text-2xl font-bold text-center mb-6 capitalize text-[#1B3C73]">
        {formattedHeading}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              _id={product._id}
              imageSrc={product.imageUrl}
              title={product.title}
              oldPrice={product.oldPrice}
              newPrice={product.newPrice}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
