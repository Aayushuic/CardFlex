import React from "react";
import { Card } from "../Card/Card";
import { useSelector } from "react-redux";
import UseGetLatestProduct from "@/hooks/UseGetLatestProduct";
import CardSkeleton from "../Card/cardSkeleton";

const LatestDesign = () => {
  const products = useSelector((state) => state.product.latestProducts);
  UseGetLatestProduct();
  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-center text-[#1B3C73]">Latest Design</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.length == 0 ? (
          [0,1,2,3,4,5,6,7,8].map((el,idx)=>{
            return <CardSkeleton key={idx}/>
          })
        ) : (
          products.map((product,idx) => {
            return (
              <Card
                key={idx}
                _id={product._id}
                imageSrc={product.imageUrl}
                title={product.title}
                oldPrice={product.oldPrice}
                newPrice={product.newPrice}
                description={product.description}
                cdrFile={product.cdrFile}
              ></Card>
            );
          })
        )}
      </div>
    </div>
  );
};

export default LatestDesign;