import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";

// GET ALL INVENTORY
export const getAllInventory = async () => {
    const inventory = await prisma.bloodInventory.findMany({
        orderBy: { bloodGroup: "asc" },
    });

    return inventory;
};

// GET BY BLOOD GROUP
export const getInventoryByBloodGroup = async (bloodGroup) => {
    const inventory = await prisma.bloodInventory.findUnique({
        where: { bloodGroup },
    });

    if (!inventory) {
        throw new ApiError(404, "No inventory found for this blood group");
    }

    return inventory;
};

// MANUAL UPDATE (ADMIN ONLY)
export const updateInventory = async (bloodGroup, quantity) => {
    const inventory = await prisma.bloodInventory.upsert({
        where: { bloodGroup },
        update: {
            quantity,
        },
        create: {
            bloodGroup,
            quantity,
        },
    });
    return inventory;
};
