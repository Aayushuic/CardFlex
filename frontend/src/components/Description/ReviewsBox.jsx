import { logout } from "@/features/authslice";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { toast } from "sonner";

const ReviewsBox = ({
  reviews,
  showAllReviews,
  user,
  handleEditReview,
  productId,
  setReviews,
  setEditingReview,
  setFeedback,
}) => {
  const [reviewLoading, setReviewLoading] = useState(false);
  const [reviewError, setReviewError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchReview = async () => {
    try {
      setReviewLoading(true);
      setReviewError(null); // Reset error state before fetching
      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/product/review?productId=${productId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
        }
      );

      const resData = await res.json();
      if (resData.success) {
        const userReview = resData.productReview.find(
          (review) => review.user?.email === user?.email
        );

        const otherReviews = resData.productReview.filter(
          (review) => review.user?.email !== user?.email
        );
        const sortedReviews = userReview
          ? [userReview, ...otherReviews]
          : otherReviews;

        setReviews(sortedReviews);
      } else {
        setReviewError(resData.message || "Failed to fetch reviews.");
      }
    } catch (error) {
      setReviewError(error.message || "Something went wrong.");
    } finally {
      setReviewLoading(false);
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  const handleDelete = async (reviewId) => {
    try {
      setDeleteLoading(reviewId);
      setEditingReview(null);
      setFeedback("");
      if (!user) {
        setError("please login in..");
        return;
      }

      const res = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/user/product/review?productId=${productId}&reviewId=${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
          credentials: "include",
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
        setReviews(resData.productReview);
        toast.success(resData.message);
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div>
      {/* Error Handling */}
      {reviewError && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          {reviewError}
        </div>
      )}

      {/* Loading State */}
      {reviewLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-5 border-b border-gray-200 animate-pulse"
            >
              <div className="h-5 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-100 rounded w-3/4 mt-2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* No Reviews Available */}
          {!reviews || reviews.length === 0 ? (
            <div className="p-4 text-gray-700 text-center rounded-lg">
              No reviews available.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(showAllReviews ? reviews : reviews.slice(0, 9)).map(
                (review) => (
                  <div
                    key={review._id}
                    className="relative flex flex-col items-start gap-3 p-5 border-b border-gray-200"
                  >
                    {/* Loader positioned in the center of the card */}
                    {deleteLoading && deleteLoading === review._id && (
                      <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-10">
                        <Loader2 className="animate-spin text-gray-700" />
                      </div>
                    )}

                    {/* Review Content */}
                    <div className="flex items-center justify-between w-full">
                      <p className="text-lg font-medium text-gray-800">
                        {review.user.name}
                      </p>
                      <StarRatings
                        rating={review.rating}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        starDimension="18px"
                        starSpacing="3px"
                        name={`rating-${review._id}`}
                      />
                    </div>

                    <span className="text-xs text-green-600 bg-green-100 py-1 px-2 rounded-lg">
                      Verified Purchase
                    </span>

                    <p className="text-gray-600 text-sm mt-2">
                      {review.comment}
                    </p>

                    {/* Edit/Delete Buttons */}
                    {review.user?.email === user?.email && (
                      <div className="flex gap-3 mt-2">
                        <button
                          onClick={() => handleEditReview(review._id)} // Call edit handler
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-600 hover:underline"
                          onClick={() => {
                            handleDelete(review._id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReviewsBox;
