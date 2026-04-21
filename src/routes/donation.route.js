import express from "express";
import {
    authMiddleware,
    authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
    createDonation,
    getAllDonations,
    updateDonationStatus,
} from "../controllers/donation.controller.js";

const router = express.Router();

router.post("/", authMiddleware, authorizeRoles("DONOR"), createDonation);

router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "STAFF"),
    getAllDonations
);

router.patch(
    "/:id/status",
    authMiddleware,
    authorizeRoles("STAFF"),
    updateDonationStatus
);

export default router;
