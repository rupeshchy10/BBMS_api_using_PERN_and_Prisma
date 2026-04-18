import { ApiError } from "../utils/ApiError.js";
import { prisma } from "../utils/prisma.js";
import bcrypt from "bcryptjs";

const safeUserSelect = {
    id: true,
    name: true,
    email: true,
    phone: true,
    address: true,
    dob: true,
    bloodGroup: true,
    role: true,
    position: true,
    createdAt: true,
    updatedAt: true,
};

// GET ALL USERS
export const getAllUsers = async () => {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        select: safeUserSelect,
    });

    return users;
};

// GET USER BY ID
export const getUserById = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id },
        select: safeUserSelect,
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return user;
};

// CREATE/REGISTER USER
export const createUser = async (data) => {
    const {
        name,
        email,
        phone,
        password,
        address,
        dob,
        bloodGroup,
        role,
        position,
    } = data;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                address,
                dob,
                bloodGroup,
                role,
                position: role === "STAFF" ? position : null,
            },
            select: safeUserSelect,
        });

        return newUser;
    } catch (error) {
        console.log("Prism Error:", error);

        if (error.code === "P2002") {
            throw new ApiError(409, "Email or phone already exists");
        }
        throw new ApiError(500, "User registration failed");
    }
};

// UPDATE USER
export const updateUser = async (id, data) => {
    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data,
            select: safeUserSelect,
        });

        return updatedUser;
    } catch (error) {
        console.log("Prism Error:", error);

        if (error.code === "P2002") {
            throw new ApiError(409, "Email or phone already exists");
        }
        throw new ApiError(500, "User update failed");
    }
};

// DELETE USER
export const deleteUser = async (id) => {
    const existingUser = await prisma.user.findUnique({
        where: { id },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    try {
        await prisma.user.delete({
            where: { id },
        });

        return true;
    } catch (error) {
        console.log("Prism Error:", error);
        throw new ApiError(500, "User update failed");
    }
};

export const loginUser = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email },
        select:safeUserSelect
    });

    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }

    return user;
};
