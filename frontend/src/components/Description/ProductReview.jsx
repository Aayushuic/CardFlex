import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StarRatings from "react-star-ratings";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { logout } from "@/features/authslice";
import { toast } from "sonner";
import { MdOutlineCancel } from "react-icons/md";
import ReviewsBox from "./ReviewsBox";

const ProductReview = ({ productId }) => {
  const user = useSelector((state) => state.auth.user);
  const [rating, setRating] = useState(4);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [editingReview, setEditingReview] = useState(null); // New state
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const changeRating = (newRating) => setRating(newRating);

  const editReviewRef = useRef(null);

  const handleEditReview = (reviewId) => {
    const review = reviews.find((review) => {
      return review._id === reviewId;
    });
    setEditingReview(review);
    setRating(review.rating);
    setFeedback(review.comment);

    setTimeout(() => {
      if (editReviewRef.current) {
        editReviewRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleUpdateReview = async () => {
    try {
      setError(null);
      setSuccess(null);
      setLoading(true);

      if (!user) {
        setError("please login in");
        return;
      }

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/product/review`,
        {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
          credentials: "include",
          body: JSON.stringify({
            productId: productId,
            reviewId: editingReview._id,
            comment: feedback,
            rating: rating,
          }),
        }
      );

      if (res.status === 401) {
        navigate("/login");
        toast.info("Session expired. Please log in again.");
        dispatch(logout());
        return;
      }

      const resData = await res.json();
      if (resData.success) {
        const userReview = resData.productReview.find(
          (review) => review.user?.email === user?.email
        );

        const otherReviews = resData.productReview.filter(
          (review) => review.user?.email !== user?.email
        );

        // Combine the user's review at the top, followed by other reviews
        const sortedReviews = userReview
          ? [userReview, ...otherReviews]
          : otherReviews;

        setReviews(sortedReviews);
        setSuccess(resData.message);
        setEditingReview(null);
        setFeedback("");
      } else {
        console.log(resData);
        setError(resData.message);
      }
    } catch (error) {
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async () => {
    try {
      setLoading(true);
      setSuccess(null);
      setError(null);
      if (!user) {
        setError("login to review product");
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/product/review?productId=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
          credentials: "include",
          body: JSON.stringify({
            rating: rating,
            comment: feedback,
            productId: productId,
          }),
        }
      );

      // Handle unauthorized error
      if (res.status === 401) {
        navigate("/login");
        toast.info("Session expired. Please log in again.");
        dispatch(logout());
        return;
      }

      const resData = await res.json();

      if (resData.success) {
        setSuccess(resData.message);
        setFeedback(""); // Clear errors if any
        const userReview = resData.productReview.find(
          (review) => review.user?.email === user?.email
        );

        const otherReviews = resData.productReview.filter(
          (review) => review.user?.email !== user?.email
        );

        // Combine the user's review at the top, followed by other reviews
        const sortedReviews = userReview
          ? [userReview, ...otherReviews]
          : otherReviews;

        setReviews(sortedReviews);
      } else {
        setError(resData.message || "Failed to submit review.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelUpdate = () => {
    setEditingReview(null);
    setFeedback("");
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h2 className="text-3xl font-semibold text-[#1B3C73] mb-8 text-center">
          Reviews
        </h2>

        {/* Reviews Display Section */}
        <ReviewsBox
          reviews={reviews}
          showAllReviews={showAllReviews}
          user={user}
          handleEditReview={handleEditReview}
          productId={productId}
          setReviews={setReviews}
          setEditingReview={setEditingReview}
          setFeedback={setFeedback}
        />

        {/* Show All Reviews Link */}
        {reviews?.length > 6 && (
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowAllReviews((prev) => !prev)}
              className="text-[#FFD700] font-medium hover:underline"
            >
              {showAllReviews
                ? "Show Less Reviews"
                : `Show All Reviews (${reviews.length})`}
            </button>
          </div>
        )}

        {/* Edit Review Section */}
        {editingReview != null && (
          <div className="mt-12" ref={editReviewRef}>
            <h3 className="text-2xl text-[#1B3C73] font-semibold mb-4 text-center">
              Edit Your Review
            </h3>
            <div className="flex flex-col items-center gap-4">
              <StarRatings
                rating={rating}
                starRatedColor="#FFD700"
                starHoverColor="#FFD700"
                changeRating={changeRating}
                numberOfStars={5}
                starDimension="28px"
                starSpacing="5px"
                name="edit-rating"
              />
              <textarea
                aria-label="Edit your feedback"
                className="w-full p-4 border-b border-gray-300 focus:outline-none focus:border-[#FFD700] text-sm resize-none max-w-lg"
                rows="3"
                placeholder="Update your feedback..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
              {error && (
                <div className="bg-red-100 border border-red-500 rounded-md px-4 py-2 my-2 flex items-center gap-2">
                  <p className="text-red-600 flex-grow">{error}</p>
                  <MdOutlineCancel
                    className="text-red-600 text-lg cursor-pointer"
                    onClick={() => setError(null)}
                  />
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-500 rounded-md px-4 py-2 my-2 flex items-center gap-2">
                  <p className="text-green-600 flex-grow">{success}</p>
                  <MdOutlineCancel
                    className="text-green-600 text-lg cursor-pointer"
                    onClick={() => setSuccess(null)}
                  />
                </div>
              )}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={handleUpdateReview}
                  className="bg-[#FFD700] hover:bg-[#FFC107] text-white px-6 py-2 rounded-full font-semibold"
                  disabled={loading}
                >
                  {loading ? "submitting" : "Save Changes"}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancelUpdate}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full font-semibold"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback Form */}
        {!editingReview && (
          <div className="mt-12">
            <h3 className="text-2xl text-[#1B3C73] font-semibold mb-4 text-center">
              Share Your Review
            </h3>
            <div className="flex flex-col items-center gap-4">
              <StarRatings
                rating={rating}
                starRatedColor="#FFD700"
                starHoverColor="#FFD700"
                changeRating={changeRating}
                numberOfStars={5}
                starDimension="28px"
                starSpacing="5px"
                name="user-rating"
              />
              <textarea
                aria-label="Share your feedback"
                className="w-full p-4 border-b border-gray-300 focus:outline-none focus:border-[#FFD700] text-sm resize-none max-w-lg"
                rows="3"
                placeholder="Tell us about your experience..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />

              {error && (
                <div className="bg-red-100 border border-red-500 rounded-md px-4 py-2 my-2 flex items-center gap-2">
                  <p className="text-red-600 flex-grow">{error}</p>
                  <MdOutlineCancel
                    className="text-red-600 text-lg cursor-pointer"
                    onClick={() => setError(null)}
                  />
                </div>
              )}
              {success && (
                <div className="bg-green-100 border border-green-500 rounded-md px-4 py-2 my-2 flex items-center gap-2">
                  <p className="text-green-600 flex-grow">{success}</p>
                  <MdOutlineCancel
                    className="text-green-600 text-lg cursor-pointer"
                    onClick={() => setSuccess(null)}
                  />
                </div>
              )}

              <Button
                variant="outline"
                onClick={handleSubmitReview}
                className={`text-black px-6 py-2 rounded-full font-semibold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FFD700] hover:bg-[#FFC107]"
                }`}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReview;
