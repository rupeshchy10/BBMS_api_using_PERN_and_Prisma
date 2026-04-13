import { z } from "zod";

// BASE SCHEMA (USED FOR REUSE)
const baseUserSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, { error: "Name must be atleast 2 characters" }),
    email: z
        .string()
        .trim()
        .toLowerCase()
        .pipe(z.email({ error: "Please provide a valid email" })),
    phone: z
        .string()
        .min(10, { error: "Phone number must be atleast 10 characters" }),
    password: z
        .string()
        .min(6, { error: "Password must be atleast 6 characters" }),
    address: z
        .string()
        .trim()
        .min(3, { error: "Address must be atleast 3 characters" }),
    dob: z.coerce.date({
        errorMap: () => ({ message: "Invalid date of birth" }),
    }),

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
    role: z.enum(["ADMIN", "STAFF", "DONOR"]).default("DONOR"),
    position: z
        .enum(["DOCTOR", "LAB_TECHNICIAN", "NURSE", "RECEPTIONIST"])
        .optional(),
});

// REGISTER SCHEMA (ALL REQUIRED)
const registerSchema = baseUserSchema;

const loginSchema = z.object({
    email: z.string().trim().toLowerCase().pipe(z.email()),
    password: z.string().min(1, { error: "Password is required" }),
});

// UPDATE SCHEMA (OPTIONAL FIELDS, RESTRICTED)
const updateUserSchema = baseUserSchema
    .omit({
        password: true, // handled separately
        role: true, // admin-only control
    })
    .partial();

// CHANGE PASSWORD SCHEMA (SEPARATE API)
const changePasswordSchema = z.object({
    oldPassword: z.string().min(1,{message:"Old password is required"}),
    newPassword: z.string().min(6,{message:"New password must be at least 6 characters"})
})

export { registerSchema, loginSchema,updateUserSchema,changePasswordSchema };
