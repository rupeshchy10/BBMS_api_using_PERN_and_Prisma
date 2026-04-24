import { prisma } from "../utils/prisma.js";

// CREATE NOTIFICATION
export const createNotification = async (userId, message) => {
    return await prisma.notification.create({
        data: {
            userId,
            message,
        },
    });
};

// GET USER NOTIFICATIONS
export const getUserNotifications = async (userId) => {
    return await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
};

// MARK AS READ
export const markAsRead = async (id, userId) => {
    return await prisma.notification.update({
        where: { id },
        data: {
            isRead: true,
        },
    });
};
