import * as userService from "../services/user.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateToken } from "../utils/generateToken.js";
import {
    registerSchema,
    updateUserSchema,
    loginSchema,
} from "../validators/user.validator.js";

// GET ALL USERS
export const getAllUsers = asyncHandler(async (req, res) => {
    const users = await userService.getAllUsers();

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

// GET USER BY ID
export const getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await userService.getUserById(id);

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});

// CREATE/REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
    // ZOD VALIDATION
    const parsedData = registerSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));
        throw new ApiError(400, "Validation failed", errors);
    }

    const newUser = await userService.createUser(parsedData.data);

    const token = generateToken(newUser.id, res);

    res.status(201).json(
        new ApiResponse(
            201,
            {
                user: newUser,
                token,
            },
            "User registered successfully"
        )
    );
});

// UPDATE USER
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const parsedData = updateUserSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));

        throw new ApiError(400, "Validation failed", errors);
    }

    const updatedUser = await userService.updateUser(id, parsedData.data);

    res.status(200).json(
        new ApiResponse(200, updatedUser, "User updated successfully")
    );
});

// DELETE USER
export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    await userService.deleteUser(id);

    res.status(200).json(
        new ApiResponse(200, null, "User deleted successfully")
    );
});

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
    const parsedData = loginSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));
        throw new ApiError(400, "Validation failed", errors);
    }

    const user = await userService.loginUser(
        parsedData.data.email,
        parsedData.data.password
    );

    const token = generateToken(user.id, res);

    res.status(200).json(
        new ApiResponse(200, { user: user, token }, "Login successful")
    );
});

// LOGOUT USER
export const logout = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json(ApiResponse(200, null, "Logged out successfully"));
});
