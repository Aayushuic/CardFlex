import React, { useState } from "react";
import Footer from "../utils/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
 // Ensure you have lucid-react installed

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="py-16 px-8 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73]  mb-12">Help & Support</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          We're here to help! If you have any questions or need assistance, please refer to the following resources.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73]  mb-4">Frequently Asked Questions (FAQ)</h2>
          <p className="text-lg text-gray-700 mb-4">Here are some common questions we receive:</p>

          {[
            { question: "1. How do I download CDR files?", answer: "After purchasing, you will receive a download link via email. If you have an account, your files will also be saved in your orders section for easy access." },
            { question: "2. Can I customize the designs?", answer: "Yes! We offer custom design services tailored to your needs." },
            { question: "3. What payment methods do you accept?", answer: "We accept all major credit/debit cards and payments through Razorpay." }
          ].map((item, index) => (
            <div key={index} className="mb-4">
              <div 
                className="bg-gray-100 p-4 rounded-lg cursor-pointer flex justify-between items-center" 
                onClick={() => toggleDropdown(index)}
              >
                <h3 className="font-semibold text-purple-600">{item.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-purple-600" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-purple-600" />
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
          <h2 className="text-3xl font-semibold text-[#1B3C73]  mb-4">Contact Support</h2>
          <p className="text-lg text-gray-700 mb-4">
            If you can't find the answers you need, please reach out to our support team:
          </p>
          <p className="text-lg font-semibold text-purple-600">Email: support@cardflex.com</p>
          <p className="text-lg font-semibold text-purple-600">Phone: +1 800 123 4567</p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Help;
