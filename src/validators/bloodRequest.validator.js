import { z } from "zod";

const createRequestSchema = z.object({
    requesterName: z.string().min(2, { message: "Name is required" }),
    hospitalName: z.string().optional(),
    phone: z.string().min(10, { message: "Valid phone required" }),
    bloodGroup: z.enum([
        "A_POS",
        "A_NEG",
        "B_POS",
        "B_NEG",
        "O_POS",
        "O_NEG",
        "AB_POS",
        "AB_NEG",
    ]),
    quantity: z.number().int().positive(),
});

const updateRequestStatusSchema = z.object({
    status: z.enum(["APPROVED", "PENDING", "REJECTED"]),
});

export { createRequestSchema, updateRequestStatusSchema };
