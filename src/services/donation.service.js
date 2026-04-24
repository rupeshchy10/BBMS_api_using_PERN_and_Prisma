// 🧠 Important Notes (current work)
// 🔐 1. req.user.id

// 👉 we will need auth middleware later
// For now, we can test with:

// const userId = "some-user-id";

import { prisma } from "../utils/prisma.js";
import { ApiError } from "../utils/ApiError.js";

// CREATE DONATION
export const createDonation = async (userId, data) => {
    const { quantity, bloodGroup, status } = data;

    // 1. CHECK LAST DONATION
    const lastDonation = await prisma.donation.findFirst({
        where: {
            donorId: userId,
            status: "APPROVED",
        },
        orderBy: {
            donationDate: "desc",
        },
    });

    if (lastDonation) {
        const lastDate = new Date(lastDonation.donationDate);
        const today = new Date();

        const diffTime = today - lastDate;
        // 1000 * 60 * 60 * 24 = 1 day
        const diffDays = diffTime / (1000 * 60 * 60 * 24);

        if(diffDays<90){
            throw new ApiError(
                400,`You can donate again after ${Math.ceil(90-diffDays)} days`
            )
        }
    }

    // 2. CREATE DONATION
    const donation = await prisma.donation.create({
        data: {
            quantity,
            bloodGroup,
            donorId: userId,
            status,
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
export const updateDonationStatus = async (id, staffId, status) => {
    const donation = await prisma.donation.findUnique({
        where: { id },
    });
    if (!donation) {
        throw new ApiError(404, "Donation not found");
    }

    if (donation.status !== "PENDING") {
        throw new ApiError(400, "Donation already processed");
    }

    // APPROVED -> ADD TO INVENTORY
    if (status === "APPROVED") {
        await prisma.bloodInventory.upsert({
            where: {
                bloodGroup: donation.bloodGroup,
            },
            update: {
                quantity: {
                    increment: donation.quantity,
                },
            },
            create: {
                bloodGroup: donation.bloodGroup,
                quantity: donation.quantity,
            },
        });
    }

    const updatedDonation = await prisma.donation.update({
        where: { id },
        data: {
            status,
            testedById: staffId,
        },
    });
    return updatedDonation;
};
