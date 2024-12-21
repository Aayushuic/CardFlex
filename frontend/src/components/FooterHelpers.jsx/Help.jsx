import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "../utils/Footer";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      {/* SEO Improvements using Helmet */}
      <Helmet>
        <title>CardFlex - Help & Support</title>
        <meta
          name="description"
          content="Need assistance? Explore our Help & Support page for answers to frequently asked questions (FAQ), contact details, and more."
        />
        <meta
          name="keywords"
          content="CardFlex, Help & Support, Frequently Asked Questions, Download CDR files, Custom Designs, Payment Methods, Razorpay, Contact Support, Invoice"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CardFlex" />
        <meta property="og:title" content="CardFlex - Help & Support" />
        <meta
          property="og:description"
          content="Need help with CardFlex services? Visit our Help & Support page to get answers to FAQs, contact support, and learn more about our offerings."
        />
        <meta property="og:url" content="https://cardflex.in/help" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cardflex.in/help-image.jpg" />
        <link rel="canonical" href="https://cardflex.in/help" />
      </Helmet>

      <div className="py-16 px-8 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73]  mb-12">
          Help & Support
        </h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          We're here to help! If you have any questions or need assistance,
          please refer to the following resources.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73]  mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Here are some common questions we receive:
          </p>

          {[ 
            {
              question: "1. How do I download CDR files?",
              answer:
                "After completing your payment, a page will appear with a download link for your purchased CDR files. If you're logged into your account, you can also access your files and invoice from the 'Orders' section in your account dashboard, where all your purchased items are stored for easy access.",
            },
            {
              question: "2. Can I customize the designs?",
              answer:
                "Yes! We offer custom design services tailored to your needs. Please contact our support team for more details on how we can help you create a unique design.",
            },
            {
              question: "3. What payment methods do you accept?",
              answer:
                "We accept all major credit/debit cards, as well as payments through Razorpay for a secure and seamless transaction experience.",
            },
          ].map((item, index) => (
            <div key={index} className="mb-4">
              <div
                className="bg-gray-100 p-4 rounded-lg cursor-pointer flex justify-between items-center"
                onClick={() => toggleDropdown(index)}
              >
                <h3 className="font-semibold text-indigo-600">
                  {item.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-indigo-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-indigo-600" />
                )}
              </div>
              {openIndex === index && (
                <div className="bg-gray-50 p-4 mt-2 rounded-lg">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73]  mb-4">
            Contact Support
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            If you can't find the answers you need, please reach out to our
            support team:
          </p>
          <p className="text-lg font-semibold text-indigo-600">
            Email: support@cardflex.in
          </p>
        </section>
        <div className="flex justify-center mt-8">
          <Button variant="outline">
            <Link
              to="/contact-us"
              onClick={() => window.scrollTo(0, 0)}
              className="text-[#1B3C73] flex group items-center"
            >
              <span className="group-hover:animate-bounce mr-2">
                <Phone />
              </span>
              Contact Us
            </Link>
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
