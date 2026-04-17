import { z } from "zod";

const createDonationSchema = z.object({
    quantity: z.number().int().positive(),
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
});

export { createDonationSchema };
