import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    getMyNotifications,
    markNotificationAsRead,
} from "../controllers/notification.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management APIs
 */

/**
 * @swagger
 * /api/v1/notifications:
 *   get:
 *     summary: Get logged-in user's notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user notifications
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getMyNotifications);

/**
 * @swagger
 * /api/v1/notifications/{id}/read:
 *   patch:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id/read", authMiddleware, markNotificationAsRead);

export default router;
