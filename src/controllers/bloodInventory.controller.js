import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as inventoryService from "../services/bloodInventory.service.js";
import { ApiError } from "../utils/ApiError.js";

// GET ALL
export const getAllInventory = asyncHandler(async (req, res) => {
    const inventory = await inventoryService.getAllInventory();

    res.status(200).json(
        new ApiResponse(200, inventory, "All Inventory fetched successfully")
    );
});

// GET BY BLOOD GROUP
export const getInventoryByBloodGroup = asyncHandler(async (req, res) => {
    const { bloodGroup } = req.params;

    const validGroups = [
        "A_POS",
        "A_NEG",
        "B_POS",
        "B_NEG",
        "O_POS",
        "O_NEG",
        "AB_POS",
        "AB_NEG",
    ];

    if (!validGroups.includes(bloodGroup)) {
        throw new ApiError(400, "Invalid blood group");
    }

    const inventory =
        await inventoryService.getInventoryByBloodGroup(bloodGroup);

    res.status(200).json(
        new ApiResponse(200, inventory, "Inventory fetched successfully")
    );
});

// MANUAL UPDATE
export const updateInventory = asyncHandler(async (req, res) => {
    const { bloodGroup } = req.params;
    const { quantity } = req.body;

    const validGroups = [
        "A_POS",
        "A_NEG",
        "B_POS",
        "B_NEG",
        "O_POS",
        "O_NEG",
        "AB_POS",
        "AB_NEG",
    ];

    if (!validGroups.includes(bloodGroup)) {
        throw new ApiError(400, "Invalid blood group");
    }

    if (typeof quantity !== "number") {
        throw new ApiError(400, "Quantity must be a number");
    }

    const inventory = await inventoryService.updateInventory(
        bloodGroup,
        quantity
    );

    res.status(200).json(
        new ApiResponse(200, inventory, "Inventory update successfully")
    );
});
