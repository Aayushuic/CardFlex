// checkoutUtils.js
export const fetchRazorpayKey = async () => {
    const res = await fetch("http://localhost:8080/api/payment/getRazorpayKey", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
    });
    const resData = await res.json();
    if (resData.success == true) {
      return resData.key;
    } else {
      throw new Error("Internal Server Error,Please Try Again Later");
    }
  };
  
  export const createOrder = async (orderDetails) => {
    const res = await fetch("http://localhost:8080/api/payment/checkout", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY,
      },
      body: JSON.stringify(orderDetails),
    });
    const orderData = await res.json();
    if (orderData.success == true) {
      return orderData;
    } else {
      throw new Error(orderData.message);
    }
  };
  
  export const initiateRazorpay = (options) => {
    const razor = new window.Razorpay(options);
    razor.open();
  };
  