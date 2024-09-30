import React from "react";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t-2 dark:bg-gray-900 text-black dark:text-white py-10 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          {/* Company Info */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">CardFlex</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              Your ultimate destination for customizable card templates. Download stunning designs for any occasion and elevate your personal or business branding.
            </p>
          </div>

          {/* Contact Information */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Email:{" "}
              <a
                href="mailto:aayushchauhan1916@gmail.com"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                aayushchauhan1916@gmail.com
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Phone:{" "}
              <a
                href="tel:+91 7060457474"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                +91 7060457474
              </a>
            </p>
          </div>

          {/* Useful Links */}
          <div className="mb-8 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="text-gray-600 dark:text-gray-400">
              <li className="mb-2">
                <Link
                  to="/about-us"
                  className="hover:text-black dark:hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/refund-cancellations-policy"
                  className="hover:text-black dark:hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Refund & Cancellations Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/privacy-policy"
                  className="hover:text-black dark:hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-black dark:hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Terms And Conditions
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/help"
                  className="hover:text-black dark:hover:text-white"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  Help
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="https://github.com/AayushChauhan1916"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-300"
            >
              <Twitter className="w-8 h-8" />
            </a>
            <a
              href="https://www.linkedin.com/in/aayush-chauhan1916/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-500"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href="https://www.instagram.com/nishkarsh.rajput/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <Instagram className="w-8 h-8" />
            </a>
          </div>
        </div>

        <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CardFlex. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
