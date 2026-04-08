import * as userService from "../services/user.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// GET ALL USERS
export const getAllUser = asyncHandler(async (req, res) => {
    const users = await userService.getAllUser();

    res.status(200).json(
        new ApiResponse(200, users, "Users fetched successfully")
    );
});

// GET USER BY ID
export const getUser = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const user = await userService.getUser(id);

    res.status(200).json(
        new ApiResponse(200, user, "User fetched successfully")
    );
});
// CREATE USER
export const createUser = asyncHandler(async (req, res) => {
    const newUser = await userService.createUser(req.body);

    res.status(201).json(
        new ApiResponse(201, newUser, "User created successfully")
    );
});

// UPDATE USER
export const updateUser = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const updatedUser = await userService.updateUser(id, req.body);

    res.status(200).json(
        new ApiResponse(200, "updatedUser", "User updated successfully")
    );
});

// DELETE USER
export const deleteUser = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);
    const deleteUser = await userService.deleteUser(id);

    res.status(200).json(
        new ApiResponse(200, deleteUser, "User deleted successfully")
    );
});
