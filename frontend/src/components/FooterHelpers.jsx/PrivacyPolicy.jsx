import React from "react";
import Footer from "../utils/Footer";
import Navbar from "../utils/Navbar";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      <div className="py-16 px-8 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73] mb-12">
          Privacy Policy
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to{" "}
          <span className="font-semibold text-indigo-600">CardFlex</span>. Your
          privacy is important to us, and this policy outlines how we handle
          your information when you visit our site and use our services.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            1. Information We Collect
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We may collect the following types of personal information:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Name</li>
            <li>Email Address</li>
            <li>Phone Number</li>
            <li>Billing Address</li>
            <li>Payment Information (processed securely via Razorpay)</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            2. How We Use Your Information
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We use your information to:
          </p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>Process transactions and manage orders</li>
            <li>Communicate with you regarding your orders and inquiries</li>
            <li>Improve our services and enhance user experience</li>
            <li>
              Send periodic emails about your order or other products and
              services
            </li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            3. Data Security
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We implement a variety of security measures to maintain the safety
            of your personal information. However, no method of transmission
            over the internet or method of electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            4. Sharing Your Information
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We do not sell, trade, or otherwise transfer your personal
            information to outside parties, except to provide services as
            required by law or with your consent.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            5. Your Rights
          </h2>
          <p className="text-lg text-gray-700 mb-4">You have the right to:</p>
          <ul className="list-disc list-inside mb-4 text-gray-700">
            <li>
              Request access to the personal information we hold about you
            </li>
            <li>Request correction of any inaccuracies</li>
            <li>Request deletion of your personal information</li>
          </ul>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            6. Changes to This Policy
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We may update this Privacy Policy from time to time. We will notify
            you of any changes by posting the new policy on our website.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            7. Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            If you have any questions or concerns about this Privacy Policy,
            please contact us:
          </p>
          <p className="text-lg font-semibold text-indigo-600">
            Email: cardflexhelp@gmail.com
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
