import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../utils/Footer";

const TermsAndConditions = () => {
  return (
    <div className="bg-white">
      {/* SEO Improvements using Helmet */}
      <Helmet>
        <title>CardFlex - Terms and Conditions</title>
        <meta
          name="description"
          content="Review the Terms and Conditions for using CardFlex services. By accessing our site, you agree to comply with our policies regarding payment, custom orders, intellectual property, and more."
        />
        <meta
          name="keywords"
          content="CardFlex, Terms and Conditions, Digital Products, Custom Orders, Payment Terms, Legal Agreement, Intellectual Property"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="CardFlex" />
        <meta property="og:title" content="CardFlex - Terms and Conditions" />
        <meta
          property="og:description"
          content="Review CardFlex's Terms and Conditions. Learn about our policies regarding payment, custom orders, and intellectual property rights."
        />
        <meta property="og:url" content="https://cardflex.in/terms-and-conditions" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://cardflex.in/terms-image.jpg" />
        <link rel="canonical" href="https://cardflex.in/terms-and-conditions" />
      </Helmet>

      <div className="py-16 px-8 md:px-16">
        <h1 className="text-4xl font-bold text-center text-[#1B3C73] mb-12">
          Terms and Conditions
        </h1>

        <p className="text-lg text-gray-700 mb-6 text-center">
          Welcome to{" "}
          <span className="font-semibold text-indigo-600">CardFlex</span>. By
          accessing or using our services, you agree to comply with these Terms
          and Conditions. Please read them carefully.
        </p>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            By using our website and services, you accept and agree to be bound
            by these Terms and Conditions. If you do not agree, please do not
            use our services.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            2. Use of Services
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            You agree to use our services only for lawful purposes and in
            accordance with these Terms. You must not use our services in any
            way that violates any applicable federal, state, or local laws or
            regulations.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            All content, trademarks, and other intellectual property on our
            website are the property of{" "}
            <span className="font-semibold text-indigo-600">CardFlex</span> or
            our licensors. You may not reproduce, distribute, or create
            derivative works without our express written permission.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            4. Payment Terms
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            All payments for services are processed securely through Razorpay.
            By providing payment information, you confirm that you are
            authorized to use the payment method and agree to pay all charges
            incurred.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            5. Custom Orders
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            For custom orders, you agree to provide accurate and complete
            information. We reserve the right to refuse or cancel any order if
            we suspect any fraudulent or unauthorized transaction.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            6. Limitation of Liability
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            To the fullest extent permitted by law,{" "}
            <span className="font-semibold text-indigo-600">CardFlex</span>{" "}
            shall not be liable for any indirect, incidental, special, or
            consequential damages arising from your use of our services.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            7. Changes to Terms
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            We reserve the right to modify these Terms and Conditions at any
            time. We will notify you of any changes by posting the new Terms on
            our website.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            8. Governing Law
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India, without regard to its conflict of
            law provisions.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-[#1B3C73] mb-4">
            9. Contact Us
          </h2>
          <p className="text-lg text-gray-700 mb-2">
            If you have any questions or concerns about these Terms and
            Conditions, please contact us:
          </p>
          <p className="text-lg font-semibold text-indigo-600">
            Email: support@cardflex.in
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
