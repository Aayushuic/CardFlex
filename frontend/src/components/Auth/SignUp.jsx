import React, { useState } from "react";
import { Helmet } from "react-helmet"; // Import Helmet for SEO
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import SignUpModal from "../Auth/PopUpModal";
import TermsModal from "../Auth/TermsModal";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!termsAccepted) {
      toast.error("You must accept the terms and conditions to proceed.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
            "X-CSRF-Token": localStorage.getItem("csrfToken"),
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();
      if (
        responseData.success ||
        responseData.message === "User already exists."
      ) {
        setModalMessage(responseData.message);
      } else {
        toast.error(responseData.message);
      }
      reset();
    } catch (error) {
      toast.error("Oops! Something went wrong, try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Sign Up | CardFlex</title>
        <meta
          name="description"
          content="Create an account on Cardflex to access secure transactions, download CDR files, and explore exclusive features. Sign up today!"
        />
        <meta
          name="keywords"
          content="Cardflex, Sign Up, Registration, CDR Downloads,CDR files,free design,free hindi design, Secure Transactions"
        />
        <meta name="author" content="Cardflex" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cardflex.in/signup" />
      </Helmet>
      <div className="flex items-center justify-center lg:w-7xl max-w-7xl mx-auto px-4">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Your Sweet Name"
              className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              {...register("name", { required: "Please enter your name" })}
            />
            {errors.name && (
              <p className="text-red-600 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Email Address"
              className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              {...register("email", {
                required: "Please enter your email",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="my-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              {...register("phoneNumber", {
                required: "Please enter your phone number",
                maxLength: {
                  value: 10,
                  message: "Enter a valid 10-digit number",
                },
                minLength: {
                  value: 10,
                  message: "Enter a valid 10-digit number",
                },
              })}
            />
            {errors.phoneNumber && (
              <p className="text-red-600 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                {...register("password", {
                  required: "Please enter a password",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="my-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0 pr-10"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="my-4 flex items-center">
            <input
              type="checkbox"
              id="terms"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="terms" className="text-sm">
              I accept the{" "}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-blue-600 underline hover:text-blue-800"
              >
                terms and conditions
              </button>
            </label>
          </div>

          <Button
            className={`my-4 w-full ${
              loading ? "bg-gray-400" : "bg-[#1B3C73] hover:bg-[#40679E]"
            }`}
            type="submit"
            disabled={loading || !termsAccepted}
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : null} Sign Up
          </Button>

          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {modalMessage && (
        <SignUpModal
          message={modalMessage}
          onClose={() => navigate("/login")}
        />
      )}
      {showTermsModal && (
        <TermsModal onClose={() => setShowTermsModal(false)} />
      )}
    </div>
  );
};

export default Signup;
