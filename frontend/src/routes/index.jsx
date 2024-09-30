import App from "@/App";
import Login from "@/components/Auth/Login";
import Signup from "@/components/Auth/SignUp";
import AboutUs from "@/components/FooterHelpers.jsx/aboutus";
import Help from "@/components/FooterHelpers.jsx/Help";
import PrivacyPolicy from "@/components/FooterHelpers.jsx/PrivacyPolicy";
import RefundAndCancellations from "@/components/FooterHelpers.jsx/RefundAndCancellations";
import TermsAndConditions from "@/components/FooterHelpers.jsx/TermsAndConditions";

import Home from "@/components/Home/Home";
import PageNotFound from "@/components/utils/PageNotFound";
import SearchResult from "@/components/utils/SearchResult";
import CartPage from "@/Pages/CartPage";
import CategoryPage from "@/Pages/CategoryPage";
import CheckoutPage from "@/Pages/CheckoutPage";
import DescriptionPage from "@/Pages/DescriptionPage";
import DownloadPage from "@/Pages/DownloadPage";
import UserOrders from "@/Pages/UserOrders";
import Protected from "@/Protected/Protected";

import * as React from "react";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category/:categoryName/:itemName",
        element: <CategoryPage />,
      },
      {
        path: "/description",
        element: <DescriptionPage />,
      },
      {
        path: "/cart",
        element: (
          <Protected>
            <CartPage />
          </Protected>
        ),
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/orders",
        element: <UserOrders />,
      },
      {
        path: "/download/:orderId/verified/:paymentId",
        element: <DownloadPage />,
      },
      {
        path: "/refund-cancellations-policy",
        element: <RefundAndCancellations />,
      },
      {
        path: "/about-us",
        element: <AboutUs />,
      },
      {
        path: "/search-result",
        element: <SearchResult />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/help",
        element: <Help />,
      },
    ],
  },
  {
    path: "/page-not-found",
    element: <PageNotFound />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
