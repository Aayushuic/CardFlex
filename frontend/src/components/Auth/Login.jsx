import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/features/authslice";
import { toast } from "sonner";


const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":import.meta.env.VITE_API_KEY,
          "X-CSRF-Token":localStorage.getItem('csrfToken')
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
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("something went wrong");
      console.log(error.message || error);
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
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
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
                className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <Link
                to="/forgot-password"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 text-sm"
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
            <Button className="w-full my-4 bg-purple-500 hover:bg-purple-700"  type="submit">
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
