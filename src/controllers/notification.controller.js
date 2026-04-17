import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as notificationService from "../services/notification.service.js";

// GET MY NOTIFICATIONS
export const getMyNotifications = asyncHandler(async (req, res) => {
    const notifications = await notificationService.getUserNotifications(
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(200, notifications, "Notification fetched successfully")
    );
});

// MARK AS READ
export const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await notificationService.markAsRead(id, req.user.id);

    res.status(200).json(
        new ApiResponse(200, notification, "Notification mark as read")
    );
});
