import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../utils/Footer";
import Modal from "./ContactFormModal";
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* SEO Improvements: Title and Meta Description */}
      <head>
        <title>Contact Us | CardFlex</title>
        <meta
          name="description"
          content="Get in touch with CardFlex for support or inquiries. Contact us via the form or our provided contact information."
        />
        <meta name="robots" content="index, follow" />
      </head>

      <div className="py-16 px-8 md:px-16 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73] mb-12">
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-12 text-center">
          We'd love to hear from you! Feel free to reach out using the form
          below or via the provided contact information.
        </p>

        <section className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              aria-labelledby="contact-form"
            >
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
                  aria-describedby="name-error"
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500">
                    {errors.name.message}
                  </p>
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
                  aria-describedby="email-error"
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500">
                    {errors.email.message}
                  </p>
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
                      value: /^\d{10}$/,
                      message: "Invalid phone number",
                    },
                  })}
                  className="border border-gray-300 p-2 rounded-lg w-full focus-visible:outline-[#1B3C73]"
                  type="tel"
                  id="phone"
                  aria-describedby="phone-error"
                />
                {errors.phoneNumber && (
                  <p id="phone-error" className="text-red-500">
                    {errors.phoneNumber.message}
                  </p>
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
                  aria-describedby="subject-error"
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-500">
                    {errors.subject.message}
                  </p>
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
                  aria-describedby="message-error"
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              {loading ? (
                <button
                  type="submit"
                  className="bg-[#1B3C73] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#17305e] transition duration-200 flex"
                  aria-live="polite"
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
              Email: support@cardflex.in
            </p>
            <p className="text-lg text-gray-700 mt-6">
              We are available from Monday to Friday, 9:00 AM - 6:00 PM. Feel
              free to drop us a message, and we will get back to you as soon as
              possible.
            </p>

            {/* Locate Us section */}
            <div className="mt-8">
              <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
                Locate Us
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Visit our office at{" "}
                <b>
                  R.K. Printing Press, near Shree Hospital, Surjan Nagar,
                  Moradabad, Uttar Pradesh
                </b>
              </p>
              <a
                href="https://www.google.com/maps/@29.2308653,78.7057841,3a,75y,114.68h,92.13t/data=!3m6!1e1!3m4!1snJzVWVgcgKDQAecUE2nJfQ!2e0!7i13312!8i6656?coh=205409&entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-indigo-600 underline"
              >
                Locate Us At Google Maps
              </a>
            </div>
          </div>
        </section>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  );
};

export default ContactUs;
