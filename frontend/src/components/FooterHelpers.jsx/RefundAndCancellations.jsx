import React from "react";
import Footer from "../utils/Footer";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const RefundAndCancellations = () => {
  return (
    <div className="bg-white">
      <div className="py-16 px-8 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73]  mb-12">
          Refund & Cancellation Policy
        </h1>

        <section className="mb-16">
          <p className="text-lg text-gray-700 mb-6">
            At <span className="font-semibold text-indigo-600">Card Flex</span>, we prioritize
            delivering digital products of the highest quality. As our products
            are digital files, we do not offer refunds or cancellations after
            the purchase has been completed.
          </p>
          <p className="text-lg text-gray-700 mb-6">
            However, if you've successfully made a payment and have not received
            the product, please reach out to our customer support for immediate
            assistance.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73]  mb-4">
            Need Help?
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            If you’ve made a purchase but didn’t receive your product, please
            contact our support team. We will resolve the issue as soon as
            possible.
          </p>
          <p className="text-lg font-semibold text-indigo-600 ">
            Email: support@yourcompany.com
          </p>
          <p className="text-lg font-semibold text-indigo-600">
            Phone: +1 800 123 4567
          </p>
        </section>

        <div className="flex justify-center mt-8">
          <Link
            to="/contact-us"
            onClick={()=>window.scrollTo(0,0)}
            className="px-6 py-3 rounded-lg"
          >
            <Button variant="outline" className="text-[#1B3C73] hover:text-[#1B3C73] ]">Contact Support</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RefundAndCancellations;
