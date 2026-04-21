import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    getMyNotifications,
    markNotificationAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getMyNotifications);

router.patch("/:id/read", authMiddleware, markNotificationAsRead);

export default router;
