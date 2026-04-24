import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";
import { createNotification } from "./notification.service.js";

// CREATE REQUEST
export const createRequest = async (userId, data) => {
    return await prisma.bloodRequest.create({
        data: {
            ...data,
            requesterId: userId,
        },
    });
};

// GET ALL REQUESTS
export const getAllRequests = async () => {
    return await prisma.bloodRequest.findMany({
        orderBy: { requestDate: "desc" },
    });
};

// UPDATE STATUS(STAFF)
export const updateRequestStatus = async (id, status, staffId) => {
    const request = await prisma.bloodRequest.findUnique({
        where: { id },
    });

    if (!request) {
        throw new ApiError(404, "Request not found");
    }

    if (request.status !== "PENDING") {
        throw new ApiError(400, "Request already processed");
    }

    // IF APPROVED -> CHECK INVENTORY
    if (status === "APPROVED") {
        const inventory = await prisma.bloodInventory.findUnique({
            where: { bloodGroup: request.bloodGroup },
        });

        if (!inventory || inventory.quantity < request.quantity) {
            throw new ApiError(400, "Not enough blood available");
        }

        // REDUCE STOCK
        await prisma.bloodInventory.update({
            where: { bloodGroup: request.bloodGroup },
            data: {
                quantity: { decrement: request.quantity },
            },
        });
    }

    // NOTIFICATION TRIGGERED
    if (request.requesterId) {
        await createNotification(
            request.requesterId,
            status === "APPROVED"
                ? "Your blood request has been approved"
                : "Your blood request has been rejected"
        );
    }

    // UPDATE REQUEST
    const updatedRequest = await prisma.bloodRequest.update({
        where: { id },
        data: {
            status,
            handledById: staffId,
        },
    });

    return updatedRequest;
};
