import express from "express";
import {
    createRequest,
    getAllRequests,
    updateRequestStatus,
} from "../controllers/bloodRequest.controller.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/",authMiddleware, createRequest);

router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "STAFF"),
    getAllRequests
);

router.patch(
    "/:id/status",
    authMiddleware,
    authorizeRoles("STAFF"),
    updateRequestStatus
);

export default router;
