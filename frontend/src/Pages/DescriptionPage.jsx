import Description from "@/components/Description/Description";
import ProductReview from "@/components/Description/ProductReview";
import React from "react";
import { useLocation } from "react-router-dom";

const DescriptionPage = () => {
  const location = useLocation();
  const productDetails = location.state;
  return (
    <div>
      <Description />
      {productDetails && <ProductReview productId={productDetails?._id} />}
    </div>
  );
};

export default DescriptionPage;
