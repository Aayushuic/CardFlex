import React, { useState } from "react";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";
import Modal from "./FeedBackModal";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const FeedBack = () => {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const getUser = useSelector((state) => state.auth.user);
  const name = getUser?.name || "GuestUser";
  const [loading, setLoading] = useState(false);

  const generateModalMessage = () => {
    if (rating >= 4) {
      return "Thank you for your positive feedback! We're glad you had a great experience!";
    } else if (rating === 3) {
      return "Thank you for your feedback! We see this as a neutral experience, and we'll work hard to make things even better.";
    } else {
      return "Thank you for your feedback! We're sorry to hear it wasn't ideal, and we're committed to improving.";
    }
  };

  const handleFeedbackSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/submit-feedback`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ rating, feedback, user: getUser?._id, name }),
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        setModalMessage(generateModalMessage());
        setIsModalOpen(true);
        setRating(1);
        setFeedback("");
      } else {
        toast.error(
          responseData.message || "Something went wrong, please try again."
        );
      }
    } catch (error) {
      toast.error("Network error, please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="px-4 md:px-8">
      <h2
        className="text-2xl font-semibold text-[#1B3C73] text-center md:text-left"
        id="feedback-heading"
      >
        Rate Your Experience
      </h2>
      <div
        className="my-4 flex justify-center md:justify-start"
        aria-labelledby="feedback-heading"
      >
        <StarRatings
          rating={rating}
          starRatedColor="#FFD700"
          starHoverColor="#FFD700"
          changeRating={changeRating}
          numberOfStars={5}
          starDimension="32px"
          starSpacing="4px"
          name="experience-rating"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center">
        <textarea
          aria-label="Share your feedback"
          className="w-full md:w-3/4 lg:w-1/2 p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200"
          rows="2"
          placeholder="Tell us about your experience with our service..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        {loading ? (
          <Button
            variant="outline"
            onClick={handleFeedbackSubmit}
            className="text-[#1B3C73] font-bold w-full md:w-auto md:ml-4 mt-4 md:mt-0"
            aria-busy={true}
            disabled={loading}
          >
            <Loader2 className="animate-spin" /> Please Wait...
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={handleFeedbackSubmit}
            className="text-[#1B3C73] w-full md:w-auto md:ml-4 mt-4 md:mt-0"
            aria-busy={false}
            disabled={loading}
          >
            Submit FeedBack
          </Button>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default FeedBack;
