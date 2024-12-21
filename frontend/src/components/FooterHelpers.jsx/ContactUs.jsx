import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Footer from "../utils/Footer";
import Modal from "./ContactFormModal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet"; // Import Helmet

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
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/user/contact`,
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
      <Helmet>
        <title>CardFlex - Contact Us</title>
        <meta
          name="description"
          content="Get in touch with CardFlex for support or inquiries. Contact us via the form or our provided contact information."
        />
        <meta
          name="keywords"
          content="Contact CardFlex, cardflex contact, Free CDR Files, Custom CDR Design Services, CardFlex Contact, Free Hindi Design, free cdr files, CDR files, custom cdr file, cardflex contact number"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CardFlex" />
        <meta property="og:title" content="CardFlex - Contact Us" />
        <meta
          property="og:description"
          content="Need assistance or have a question? Reach out to CardFlex for all your inquiries. We are here to help!"
        />
        <meta property="og:url" content="https://cardflex.in/contact-us" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cardflex.in/contact-us-image.jpg" />
        <link rel="canonical" href="https://cardflex.in/contact-us" />
      </Helmet>

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
              {/* Form Fields */}
              {/* ... (same form fields as before) */}
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
