import * as donationService from "../services/donation.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createDonationSchema } from "../validators/donation.validator.js";

// CREATE DONATION
export const createDonation = asyncHandler(async (req, res) => {
    const parsedData = createDonationSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));
        throw new ApiError(400, "Validation failed", errors);
    }
    const newDonation = await donationService.createDonation(
        req.user.id,
        parsedData.data
    );

    res.status(201).json(
        new ApiResponse(201, newDonation, "Donation created successfully")
    );
});

// GET ALL DONATIONS
export const getAllDonations = asyncHandler(async (req, res) => {
    const donation = await donationService.getAllDonations();

    res.status(200).json(
        new ApiResponse(200, donation, "Donations fetched successfully")
    );
});

// UPDATE STATUS (STAFF)
export const updateDonationStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const donation = await donationService.updateDonationStatus(
        id,
        req.user.id,
        status
    );

    res.status(200).json(
        new ApiResponse(200, donation, "Donation status updated")
    );
});
