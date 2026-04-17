import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";
import { createNotification } from "./notification.service.js";

// CREATE TEST REPORT
export const createReport = async (staffId, data) => {
    const { donationId, hemoglobin, bloodPressure, diseaseNotes, status } =
        data;

    // 1. Check donation exists
    const donation = await prisma.donation.findUnique({
        where: { id: donationId },
    });

    if (!donation) {
        throw new ApiError(404, "Donation not found");
    }

     if(donation.status!=="PENDING"){
        throw new ApiError(400,"Donation already processed")
    }

    // 2. Prevent duplicate report
    const existingReport = await prisma.bloodTestReport.findUnique({
        where: { donationId },
    });

    if (existingReport) {
        throw new ApiError(400, "Report already exists for this donation");
    }

    // 3. Create Report
    const report = await prisma.bloodTestReport.create({
        data: {
            donationId,
            testedById: staffId,
            hemoglobin,
            bloodPressure,
            diseaseNotes,
        },
    });

    // 4. Update donation status
    await prisma.donation.update({
        where: { id: donationId },
        data: {
            status,
            testedById: staffId,
        },
    });

    // 5. If approved -> update inventory
    if (status === "APPROVED") {
        await prisma.bloodInventory.upsert({
            where: { bloodGroup: donation.bloodGroup },
            update: {
                quantity: { increment: donation.quantity },
            },
            create: {
                bloodGroup: donation.bloodGroup,
                quantity: donation.quantity,
            },
        });
    }

    // NOTIFICATION TRIGGERED FROM BLOODTESTREPORT
    if(status==="APPROVED"){
        await createNotification(donation.donorId,"Your blood donation has been approved")
    } else{
        await createNotification(
            donation.donorId, "Your blood donation has been rejected"
        )
    }


    return report;
};
