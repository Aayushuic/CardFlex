import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // Import Helmet for SEO
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2, RefreshCcw } from "lucide-react"; // Import retry icon
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/features/authslice";
import { toast } from "sonner";
import { setCurrentOrder, setPaymentStatus } from "@/features/paymentSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [backendError, setBackendError] = useState("");
  const [loginTry, setLoginTry] = useState(0);
  const [captcha, setCaptcha] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const [captchaGenerated, setCaptchaGenerated] = useState(""); // Ensure CAPTCHA is set properly

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Generate CAPTCHA
  const generateCaptcha = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; // Possible characters
    let captcha = "";
    const captchaLength = 6; // Length of the captcha

    for (let i = 0; i < captchaLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length); // Random index from the characters string
      captcha += characters[randomIndex]; // Append the random character
    }

    setCaptchaGenerated(captcha); // Set the generated captcha
  };

  // Validate CAPTCHA input
  const validateCaptcha = () => {
    return captchaValue === captchaGenerated; // Check if the CAPTCHA matches
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setBackendError("");

    // Increment login attempts
    setLoginTry((prevLoginTry) => prevLoginTry + 1);

    // If CAPTCHA is required (after 3 failed attempts), validate it
    if (loginTry >= 3) {
      if (!captchaValue) {
        setBackendError("Please complete the CAPTCHA.");
        setLoading(false);
        return;
      }

      if (!validateCaptcha()) {
        setBackendError("Incorrect CAPTCHA. Please try again.");
        generateCaptcha(); // Regenerate CAPTCHA for retry
        setCaptchaValue(""); // Clear CAPTCHA input field
        setLoading(false);
        return;
      }
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/login`,
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

      if (responseData.success === true) {
        dispatch(setAuthUser(responseData.user));
        dispatch(setCurrentOrder(null));
        dispatch(setPaymentStatus(null));
        toast.success(responseData.message);
        reset();
        navigate("/");
      } else {
        if (loginTry >= 2) {
          generateCaptcha(); // Generate CAPTCHA only after 3 failed attempts
          setCaptcha(true); // Show CAPTCHA field after 3 failed attempts
        }
        setBackendError(responseData.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  // Retry CAPTCHA generation
  const retryCaptcha = () => {
    generateCaptcha();
    setCaptchaValue(""); // Reset CAPTCHA input value
  };

  return (
    <div>
      <Helmet>
        <title>Login | CardFlex</title>
        <meta
          name="description"
          content="Login to Cardflex and access premium features including secure transactions, CDR file downloads, and more."
        />
        <meta
          name="keywords"
          content="Cardflex, Login, Secure Login, CDR Downloads, CDR files, free design, Payment Gateway, free hindi design"
        />
        <meta name="author" content="Cardflex" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://cardflex.in/login" />
      </Helmet>
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
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />
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

          {/* CAPTCHA field shown after 3 failed attempts */}
          {captcha && (
            <div className="my-2">
              <div className="flex gap-2 items-center">
                <Label htmlFor="captcha">
                  <span
                    className="font-bold text-xl"
                    style={{
                      display: "inline-block",
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                      background:
                        "linear-gradient(45deg, #f0f0f0 25%, #d4d4d4 25%, #d4d4d4 50%, #f0f0f0 50%, #f0f0f0 75%, #d4d4d4 75%, #d4d4d4 100%)",
                      backgroundSize: "40px 40px",
                      textAlign: "center",
                      fontFamily: "monospace, sans-serif",
                      letterSpacing: "5px",
                      color: "#333",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Display each character with random styles */}
                    {captchaGenerated.split("").map((char, index) => (
                      <span
                        key={index}
                        style={{
                          display: "inline-block",
                          transform: `rotate(${Math.random() * 30 - 15}deg)`, // Random rotation between -15 to 15 degrees
                          fontSize: `${Math.random() * 10 + 20}px`, // Random font size between 20px and 30px
                          color: `hsl(${Math.random() * 360}, 70%, 50%)`, // Random color
                          margin: "0 2px",
                        }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </Label>

                <div
                  className="cursor-pointer text-gray-600"
                  onClick={retryCaptcha}
                >
                  <RefreshCcw className="h-5 w-5" />
                </div>
              </div>

              <Input
                id="captcha"
                name="captcha"
                className="mt-1 focus-visible:ring-0 focus-visible:ring-offset-0"
                type="text"
                placeholder="Enter CAPTCHA value"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value)}
              />
            </div>
          )}

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
