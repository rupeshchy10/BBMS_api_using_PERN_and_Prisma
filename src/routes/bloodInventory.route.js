import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import {
    getAllInventory,
    getInventoryByBloodGroup,
    updateInventory,
} from "../controllers/bloodInventory.controller.js";

const router = express.Router();

router.get("/", authMiddleware, getAllInventory);

router.get("/:bloodGroup", authMiddleware, getInventoryByBloodGroup);

router.patch(
    "/:bloodGroup",
    authMiddleware,
    authorizeRoles("ADMIN"),
    updateInventory
);

export default router;
