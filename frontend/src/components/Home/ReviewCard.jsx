import React from 'react';

const ReviewCard = ({ review }) => {
  const { userName, text, rating } = review;

  // Function to render stars based on the rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-yellow-500' : 'text-gray-300'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="border rounded-lg shadow-sm p-4 mb-4 w-full">
      <div className="flex items-center mb-2">
        <div className="flex">{renderStars()}</div>
        <span className="ml-2 font-semibold text-gray-700">{userName}</span>
      </div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};


export default ReviewCard;
