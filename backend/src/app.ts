import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";

// Routes
import adminAuthRoutes from "./routes/admin-auth.routes";
import productRoutes from "./routes/product.routes";
import categoryRoutes from "./routes/category.routes";
import orderRoutes from "./routes/order.routes";
import cartRoutes from "./routes/cart.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import couponRoutes from "./routes/coupon.routes";
import reviewRoutes from "./routes/review.routes";
import adminReviewRoutes from "./routes/admin-review.routes";
import adminProfileRoutes from "./routes/admin-profile.routes";
import adminCustomerRoutes from "./routes/admin-customer.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import brandRoutes from "./routes/brand.routes";
import bannerRoutes from "./routes/banner.routes";
import statisticRoutes from "./routes/statistic.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import addressRoutes from "./routes/address.routes";

const app = express();

// =====================================================
// SECURITY
// =====================================================

app.use(helmet());

// =====================================================
// CORS
// =====================================================

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  })
);

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cookieParser());
app.use(express.json());

// =====================================================
// API ROUTES
// =====================================================

// Products
app.use("/api/products", productRoutes);

// Categories
app.use("/api/categories", categoryRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// Cart
app.use("/api/cart", cartRoutes);

// Wishlist
app.use("/api/wishlist", wishlistRoutes);

// Coupons
app.use("/api/coupons", couponRoutes);

// Customer Reviews
app.use("/api/reviews", reviewRoutes);

// Admin Reviews
app.use("/api/admin/reviews", adminReviewRoutes);

// Admin Profile
app.use("/api/admin/profile", adminProfileRoutes);

// Admin Customers
app.use("/api/admin/customers", adminCustomerRoutes);

// Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Brands
app.use("/api/brands", brandRoutes);

// Banners
app.use("/api/banners", bannerRoutes);

// Statistics
app.use("/api/statistics", statisticRoutes);

// =====================================================
// AUTHENTICATION
// =====================================================

// Customer authentication
app.use("/api/auth", authRoutes);

// Admin authentication
app.use("/api/admin-auth", adminAuthRoutes);

// =====================================================
// USERS & ADDRESSES
// =====================================================

// Users
app.use("/api/users", userRoutes);

// Addresses
app.use("/api/addresses", addressRoutes);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Krushi Seva Kendra API Running",
  });
});

// =====================================================
// EXPORT
// =====================================================

export default app;