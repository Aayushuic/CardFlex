import React from 'react';
import { FaCheckCircle, FaDownload, FaLightbulb, FaHeadset, FaTicketAlt, FaClock } from 'react-icons/fa';

const WhyChooseCardFlex = () => {
  const features = [
    {
      title: 'Ready-to-Use Designs',
      description: 'Access a variety of pre-made designs that are ready for immediate use, saving your valuable time.',
      icon: <FaCheckCircle className="text-indigo-500 text-5xl mb-4" />, // Larger icons
    },
    {
      title: 'Instant Download',
      description: 'Download your selected designs instantly without any delays or additional steps.',
      icon: <FaDownload className="text-indigo-500 text-5xl mb-4" />,
    },
    {
      title: 'New & Exceptional Designs',
      description: 'Discover unique and high-quality designs that stand out from the competition.',
      icon: <FaLightbulb className="text-indigo-500 text-5xl mb-4" />,
    },
    {
      title: 'Technical Support',
      description: 'Get assistance with any technical issues to ensure a smooth experience.',
      icon: <FaHeadset className="text-indigo-500 text-5xl mb-4" />,
    },
    {
      title: 'Ticket Support System',
      description: 'Resolve your queries within 24 hours through our efficient ticket support system.',
      icon: <FaTicketAlt className="text-indigo-500 text-5xl mb-4" />,
    },
    {
      title: 'Access Anytime',
      description: 'Easily download your purchased designs anytime from the Orders section.',
      icon: <FaClock className="text-indigo-500 text-5xl mb-4" />,
    },
  ];

  return (
    <div className="px-4 md:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-[#1B3C73] mb-6">
          Why Choose <span className="text-indigo-500">CardFlex</span>?
        </h2>
        <p className="text-[#1B3C73] text-lg mb-12">
          Find all your necessary design items at affordable rates. Save time and grow your business with our exceptional services.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 sm:p-8 text-center border-t-4 border-indigo-500 hover:shadow-2xl transition duration-300"
            >
              <div>{feature.icon}</div>
              <h3 className="text-2xl font-bold text-[#1B3C73] mt-3 mb-3">
                {feature.title}
              </h3>
              <p className="text-[#1B3C73] text-base leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseCardFlex;
