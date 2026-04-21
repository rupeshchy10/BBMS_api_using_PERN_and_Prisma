import express from "express";
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
} from "../controllers/user.controller.js";
import {
    authMiddleware,
    authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", authMiddleware, getUserById);

router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

export default router;
