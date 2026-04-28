import express from "express";
import userRoutes from "./routes/user.route.js";
import donationRoutes from "./routes/donation.route.js";
import reportRoutes from "./routes/bloodTestReport.route.js";
import requestRoutes from "./routes/bloodRequest.route.js";
import inventoryRoutes from "./routes/bloodInventory.route.js";
import notificationRoutes from "./routes/notification.route.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { ApiError } from "./utils/ApiError.js";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

// BODY PARSING
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true, limit: "20kb" }));

// STATIC FILES
app.use(express.static("public"));

// HOME ROUTE
app.get("/", (req, res) => {
    res.redirect("/api-docs");
});

// API ROUTES
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/donations", donationRoutes);
app.use("/api/v1/reports", reportRoutes);
app.use("/api/v1/requests", requestRoutes);
app.use("/api/v1/inventory", inventoryRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 HANDLER
// PUT THIS ALWAYS AFTER API ROUTES, OTHERWISE ROUTES WILL BE NEVER FOUND
app.use((req, res, next) => {
    next(new ApiError(404, "Route not found"));
});

// GLOBAL ERROR HANDLER
app.use(errorMiddleware);

export { app };
