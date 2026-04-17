// 🧠 Important Notes (current work)
// 🔐 1. req.user.id

// 👉 we will need auth middleware later
// For now, we can test with:

// const userId = "some-user-id";

import { prisma } from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

// CREATE DONATION
export const createDonation = async (userId, data) => {
    const { quantity, bloodGroup } = data;

    const donation = await prisma.donation.create({
        data: {
            quantity,
            bloodGroup,
            donorId: userId,
        },
    });

    return donation;
};

// GET ALL DONATIONS
export const getAllDonations = async () => {
    const donations = await prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            donor: {
                select: {
                    id: true,
                    name: true,
                    bloodGroup: true,
                },
            },
        },
    });
    return donations;
};

// UPDATE STATUS (STAFF)
export const updateDonationStatus = async (id, status, staffId) => {
    const donation = await prisma.donation.findUnique({
        where: { id },
    });
    if (!donation) {
        throw new ApiError(404, "Donation not found");
    }

    return await prisma.donation.update({
        where: { id },
        data: {
            status,
            testedById: staffId,
        },
    });
};
