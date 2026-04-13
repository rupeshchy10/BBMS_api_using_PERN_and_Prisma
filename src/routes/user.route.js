import express from "express";
import {
    registerUser,
    deleteUser,
    getAllUsers,
    updateUser,
    getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", registerUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
