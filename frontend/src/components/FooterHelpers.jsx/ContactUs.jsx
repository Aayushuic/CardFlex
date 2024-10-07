
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../utils/Footer";
import Modal from "./ContactFormModal"; // Import the Modal component
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/user/contact`, {
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
        reset();
        setIsModalOpen(true);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      console.log(error.message || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="py-16 px-8 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73] mb-12">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          We'd love to hear from you! Feel free to reach out using the form
          below or via the provided contact information.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name Field */}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  type="text"
                  id="name"
                />
                {errors.name && (
                  <p className="text-red-500">{errors.name.message}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  type="email"
                  id="email"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^\d{10}$/, // Must be exactly 10 digits
                      message: "Invalid phone number",
                    },
                  })}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  type="tel"
                  id="phone"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              {/* Subject Field */}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  {...register("subject", { required: "Subject is required" })}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  type="text"
                  id="subject"
                />
                {errors.subject && (
                  <p className="text-red-500">{errors.subject.message}</p>
                )}
              </div>

              {/* Message Field */}
              <div className="mb-4">
                <label className="block mb-2" htmlFor="message">
                  Message (Optional)
                </label>
                <textarea
                  {...register("message")}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  id="message"
                  rows="4"
                />
                {errors.message && (
                  <p className="text-red-500">{errors.message.message}</p>
                )}
              </div>

              {/* Submit Button */}
              {loading ? (
                <button
                  type="submit"
                  className="bg-[#1B3C73] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#17305e] transition duration-200 flex"
                >
                  <Loader2 className="animate-spin mr-2" />
                  Please Wait...
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-[#1B3C73] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#17305e] transition duration-200"
                >
                  Send Message
                </button>
              )}
            </form>
          </div>

          <div className="md:w-1/2 flex flex-col ml-2">
            <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-700 mb-4">
              You can reach us through the following contact details:
            </p>
            <p className="text-lg font-semibold text-indigo-600 mb-2">
              Email: cardflexhelp@gmail.com
            </p>
            <p className="text-lg font-semibold text-indigo-600 mb-2">
              Phone: +91 7060457474
            </p>
            <p className="text-lg text-gray-700 mt-6">
              We are available from Monday to Friday, 9:00 AM - 6:00 PM. Feel
              free to drop us a message, and we will get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      </div>

      {/* Modal for success message */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default ContactUs;
