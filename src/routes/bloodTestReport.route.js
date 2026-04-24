import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";
import { createReport } from "../controllers/bloodTestReport.controller.js";

const router = express.Router();

router.post("/",authMiddleware,authorizeRoles("STAFF"),createReport)

export default router;