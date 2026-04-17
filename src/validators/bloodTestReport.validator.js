import { z } from "zod";

const createReportSchema = z.object({
    donationId: z.string(),
    hemoglobin: z.string().optional(),
    bloodPressure: z.string().optional(),
    diseaseNotes: z.string().optional(),
    status: z.enum(["APPROVED", "REJECTED"]),
});

export { createReportSchema };
