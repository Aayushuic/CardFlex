const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
// const csurf = require("csurf");
require("dotenv").config();
const usersRouter = require("./routes/users");
const adminRouter = require("./routes/admin/product");
const productRouter = require("./routes/fetchProduct");
const cartRouter = require("./routes/cart");
const paymentRouter = require("./routes/paymentRouter");
const orderRouter = require("./routes/orderRouter");
const database = require("./utils/database");
const apiKeyMiddleware = require("./middleware/apiKeyMiddleWare");
const verificationRouter = require("./routes/verification");
const forgotRouter = require("./routes/ForgotPassword");
const webhookCaller = require("./Webhook/webhook");
const bodyParser = require("body-parser");

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"], // Frontend URL
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "x-api-key",
    "X-CSRF-Token",
  ],
};

// CSRF protection setup
// const csrfProtection = csurf({
//   cookie: {
//     httpOnly: true, // Prevent access to cookies via client-side JavaScript
//     secure: process.env.NODE_ENV === "production", // Use HTTPS in production
//     sameSite: "lax", // Prevents CSRF from other sites
//   },
// });

// Apply middlewares
app.use(cors(corsOptions));
app.use(logger("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "dist")));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIESECRET)); // Important: cookie-parser should come before csurf
// app.use(express.static(path.join(__dirname, "public"))

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// app.set("trust proxy", true);
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // Trust the first proxy in production
}

// Rate limiter to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});

// API key middleware for secure endpoints

app.post("/api/razorpay/webhook", webhookCaller);
app.use("/api/payment", limiter, paymentRouter);

// app.use("/api", csrfProtection);

// Routes
// app.get("/api/get-csrf-token", (req, res) => {
//   res.status(200).json({ csrfToken: req.csrfToken() });
// });

// Apply rate limiter and routes
app.use("/api/reset", forgotRouter);
app.use("/api/user/verify", verificationRouter);
app.use("/api/user", apiKeyMiddleware, usersRouter);
app.use("/api/admin", apiKeyMiddleware, adminRouter);
app.use("/api/user/product", apiKeyMiddleware, productRouter);
app.use("/api/user/cart", apiKeyMiddleware, cartRouter);
app.use("/api/user/order", apiKeyMiddleware, orderRouter);

app.all("/api/*", (req, res) => {
  res.render("pagenotfound");
});

// Error handling middleware
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  console.log(err);
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// Database connection and server start
const port = process.env.PORT || 4000;
database()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

module.exports = app;
