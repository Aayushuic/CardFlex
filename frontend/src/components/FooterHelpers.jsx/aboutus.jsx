import React from "react";
import Footer from "../utils/Footer";
import { Link } from "react-router-dom";

const AboutUs = () => (
  <div className="bg-white">
    <div className="py-16 px-8 md:px-16">
      <h1 className="text-4xl font-bold text-center text-pink-500 mb-12">About Us</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Welcome to{" "}
        <span className="font-semibold text-purple-600">CardFlex</span> – your one-stop shop for professional digital designs and custom CDR file services. We’re passionate about bringing your visions to life with expertly crafted templates and personalized designs.
      </p>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-pink-500 mb-4">What We Offer</h2>
        <p className="text-lg text-gray-700 mb-4">
          At <span className="font-semibold text-purple-600">CardFlex</span>, we specialize in providing digital CDR files for a wide variety of design needs, including:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-700">
          <li>Invitation Cards for weddings, birthdays, and events</li>
          <li>Business Cards, Posters, and Menus</li>
          <li>ID Cards for students, employees, and organizations</li>
          <li>Banners and other promotional designs</li>
        </ul>
        <p className="text-lg text-gray-700 mb-4">
          All our designs are available in CDR (CorelDRAW) format, ensuring high-quality and editable templates that you can customize as per your needs.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-pink-500 mb-4">Custom Orders</h2>
        <p className="text-lg text-gray-700 mb-4">
          Looking for something unique? We offer custom design services tailored specifically to your needs. Whether it’s a special event invitation, a corporate design, or something entirely new, our expert designers are ready to help you create something truly personalized.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Simply share your vision with us, and we’ll work with you to bring it to life!
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-pink-500 mb-4">Get In Touch</h2>
        <p className="text-lg text-gray-700 mb-2">
          Have questions or want to place a custom order? Contact us, and we’ll be happy to assist you.
        </p>
        <p className="text-lg font-semibold text-purple-600">Email: support@cardflex.com</p>
        <p className="text-lg font-semibold text-purple-600">Phone: +1 800 123 4567</p>
      </section>

      <div className="flex justify-center mt-8">
        <Link
          to="/help"
          onClick={()=>window.scrollTo(0,0)}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-500 transition duration-200"
        >
          Contact Us
        </Link>
      </div>
    </div>
    <Footer />
  </div>
);

export default AboutUs;
