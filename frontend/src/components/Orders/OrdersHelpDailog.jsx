import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { logout } from "@/features/authslice";
import { resetPayment } from "@/features/paymentSlice";

const HelpDialog = ({
  isOpen,
  setIsOpen,
  razorpay_order_id,
  receipt,
  setModalMessage,
  setModalTitle,
  setIsModalOpen,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Pre-fill form with user data when dialog opens
  useEffect(() => {
    if (isOpen && user) {
      setTimeout(() => {
        setValue("name", user.name || "");
        setValue("phoneNumber", user.phoneNumber || "");
        // Optionally blur the field to avoid selection
        document.activeElement.blur();
      }, 0);
    }
  }, [isOpen, user, setValue]);

  // Handle form submission
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const updatedFormData = {
        ...formData, // Spread the existing formData
        razorpay_order_id, // Add razorpay_order_id
        receipt, // Add receipt
      };
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/order/support`,
        {
          method: "POST",
          body: JSON.stringify(updatedFormData),
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (res.status === 401) {
        navigate("/login");
        dispatch(logout());
        dispatch(resetPayment());
        toast.info("Session expired. Please log in again.");
        return;
      }

      const resData = await res.json();
      if (resData.success) {
        const ticketNumber = resData.ticketNumber;
        setIsModalOpen(true);
        setModalTitle(`Ticket-${ticketNumber}`);
        setModalMessage(
          "Your order support request has been submitted successfully! We will review your request and get back to you shortly. Thank you for your patience."
        );
      } else {
        toast.error(resData.message);
      }
    } catch (error) {
      toast.error(error.message || error);
    } finally {
      setIsOpen(false);
      reset();
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        aria-describedby="help-description"
        className="sm:w-full md:max-w-lg p-4 space-y-4"
      >
        <DialogHeader>
          <DialogTitle>Order Support Request</DialogTitle>
          <DialogDescription>
            Please fill out the form below to report an issue with your order.
          </DialogDescription>
        </DialogHeader>

        <div id="help-description" className="space-y-4 text-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              placeholder="Your Name"
              {...register("name", { required: "Name is required." })}
              className="w-full focus-visible:ring-offset-0 focus-visible:ring-1"
            />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
            <Input
              placeholder="Your Phone Number"
              {...register("phoneNumber", {
                required: "Phone number is required.",
                minLength: {
                  value: 10,
                  message: "Phone number must be at least 10 digits.",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number cannot exceed 10 digits.",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Phone number must contain only digits.",
                },
              })}
              className="w-full focus-visible:ring-offset-0 focus-visible:ring-1"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-xs">
                {errors.phoneNumber.message}
              </p>
            )}
            <select
              {...register("issue", { required: "Please select an issue." })}
              className="w-full p-2 border rounded focus-visible:ring-offset-0 focus-visible:ring-1 cursor-pointer"
            >
              <option value="">Select an issue</option>
              <option value="Payment Done File Not Received">
                Payment Done File Not Received
              </option>
              <option value="Received Wrong Item">Received Wrong Item</option>
              <option value="Unable to Download">Unable to Download</option>
              <option value="Poor Quality">Poor Quality</option>
              <option value="Others">Others</option>
            </select>
            {errors.issue && (
              <p className="text-red-500 text-xs">{errors.issue.message}</p>
            )}
            <Textarea
              placeholder="Additional details..."
              {...register("additionalDetails", {
                required: "Additional details are required.",
                minLength: {
                  value: 30,
                  message: "Additional details must be at least 30 characters.",
                },
                maxLength: {
                  value: 200,
                  message: "Additional details cannot exceed 200 characters.",
                },
              })}
              className="w-full focus-visible:ring-offset-0 focus-visible:ring-1"
            />
            {errors.additionalDetails && (
              <p className="text-red-500 text-xs">
                {errors.additionalDetails.message}
              </p>
            )}
            <DialogFooter>
              {loading ? (
                <div className="w-full flex justify-center items-center mt-2 md:mt-0">
                  <Loader2 className="animate-spin" size={24} />
                </div>
              ) : (
                <>
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="w-full md:w-auto mt-2 md:mt-0 bg-red-500 hover:bg-red-400 text-white"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full md:w-auto"
                  >
                    Submit
                  </Button>
                </>
              )}
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HelpDialog;
