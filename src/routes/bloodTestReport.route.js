import express from "express";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware";
import { createReport } from "../controllers/bloodTestReport.controller";

const router = express.Router();

router.post("/",authMiddleware,authorizeRoles("STAFF"),createReport)

export default router;