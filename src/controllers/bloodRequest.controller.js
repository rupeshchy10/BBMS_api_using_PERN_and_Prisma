import * as requestService from "../services/bloodRequest.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
    createRequestSchema,
    updateRequestStatusSchema,
} from "../validators/bloodRequest.validator.js";

// CREATE REQUEST
export const createRequest = asyncHandler(async (req, res) => {
    const parsedData = createRequestSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));

        throw new ApiError(400, "Validation failed", errors);
    }

    const request = await requestService.createRequest(
        req.user.id,
        parsedData.data
    );

    res.status(201).json(
        new ApiResponse(201, request, "Blood request created")
    );
});

// GET ALL
export const getAllRequests = asyncHandler(async (req, res) => {
    const requests = await requestService.getAllRequests();

    res.status(200).json(
        new ApiResponse(200, requests, "Requests fetched successfully")
    );
});

// UPDATE REQUEST STATUS
export const updateRequestStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const parsedData = updateRequestStatusSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));

        throw new ApiError(400, "Validation failed", errors);
    }

    const updated = await requestService.updateRequestStatus(
        id,
        parsedData.data.status,
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(200, updated, "Request status updated")
    );
});
