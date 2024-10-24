import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react"; // Import the eye icons
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/features/authslice";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setBackendError(""); // Reset backend error before new request
    try {
      const response = await fetch(`/api/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_API_KEY,
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.success === true) {
        dispatch(setAuthUser(responseData.user));
        toast.success(responseData.message);
        reset();
        navigate("/");
      } else {
        setBackendError(responseData.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center lg:w-7xl max-w-7xl mx-auto px-4">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          {backendError && (
            <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4">
              {backendError}
            </div>
          )}
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {/* Eye icon to toggle visibility */}
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </div>
              <Link
                to="/forgot-password"
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
              >
                Forgot?
              </Link>
            </div>
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Please Wait...
            </Button>
          ) : (
            <Button
              className="w-full my-4 bg-[#1B3C73] hover:bg-[#40679E]"
              type="submit"
            >
              Login
            </Button>
          )}
          <span className="text-sm">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1">
              Signup
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
