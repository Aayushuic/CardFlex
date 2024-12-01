import React from 'react';

const ReviewCard = ({ review }) => {
  const { userName, text, rating } = review;

  // Function to render stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-[30px] ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="p-6 mb-6 w-full max-w-lg mx-auto min-h-[100px] flex flex-col justify-between bg-white">
      <div className="flex items-center mb-3">
        <div className="flex">{renderStars()}</div>
        <span className="ml-4 font-semibold text-xl text-[#1B3C73]">{userName}</span>
      </div>
      <p className="text-lg text-gray-700 flex-grow">{text}</p>
    </div>
  );
};

export default ReviewCard;
