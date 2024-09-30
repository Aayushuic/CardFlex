import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:8080/api/user/signup`, {
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
      if (
        responseData.success ||
        responseData.message == "User already exists."
      ) {
        toast.success(responseData.message);
        navigate("/login");
      } else {
        toast.error(responseData.message);
      }
      reset();
    } catch (error) {
      toast.error("oops! something went wrong, try later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-full md:w-1/2 border border-gray-200 rounded-md my-10 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>
          <div className="my-2">
            <Label htmlFor="name">Name</Label>
            <Input
              className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
              id="name"
              type="text"
              placeholder="Your Sweet Name"
              {...register("name", { required: "missing" })}
            />
            {errors.fullName && (
              <p className="text-red-600 text-sm">{errors.fullName.message}</p>
            )}
          </div>
          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
              type="email"
              placeholder="Email Address"
              {...register("email", {
                required: "missing",
                pattern: {
                  value:
                    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                  message: "Enter a valid email",
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
              className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
              type="number"
              placeholder="Phone Number "
              {...register("phoneNumber", {
                required: "missing",
                maxLength: { value: 10, message: "Enter valid number" },
                minLength: { value: 10, message: "Enter valid number" },
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
            <Input
              id="password"
              className="mt-1 focus-visible:ring-0  focus-visible:ring-offset-0"
              type="password"
              placeholder="password"
              {...register("password", {
                required: "missing",
              })}
            />
            {errors.password && (
              <p className="text-red-600 text-sm">{errors.password.message}</p>
            )}
          </div>
          {/* <div className="my-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              className="mt-1"
              type="password"
              placeholder="confirm password"
              name="confirmPassword"
              {...register("confirmPassword", {
                validate: (value, formValues) =>
                  value === formValues.password || "password does not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-600 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div> */}
          {loading ? (
            <Button
              className="my-4 flex items-center gap-3 w-full bg-purple-500 hover:bg-purple-700"
              type="submit"
            >
              <Loader2 className="animate-spin" /> loading...
            </Button>
          ) : (
            <Button
              className="my-4 flex items-center gap-3 w-full bg-purple-500 hover:bg-purple-700"
              type="submit"
            >
              Sign Up
            </Button>
          )}

          <div className="text-sm flex ">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline ml-2">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
