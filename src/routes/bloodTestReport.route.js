import express from "express";
import {
    authMiddleware,
    authorizeRoles,
} from "../middlewares/auth.middleware.js";
import { createReport } from "../controllers/bloodTestReport.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blood Test Reports
 *   description: Blood test report management APIs
 */

/**
 * @swagger
 * /api/v1/reports:
 *   post:
 *     summary: Create a blood test report
 *     tags: [Blood Test Reports]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - donationId
 *             properties:
 *               donationId:
 *                 type: string
 *                 example: 5e9a2c7d-1a6b-4a8b-9d12-3f456789abcd
 *                 description: Donation ID associated with the report
 *               hemoglobin:
 *                 type: number
 *                 example: 13.5
 *                 description: Hemoglobin level
 *               bloodPressure:
 *                 type: string
 *                 example: 120/80
 *                 description: Blood pressure reading
 *               diseaseNotes:
 *                 type: string
 *                 example: No disease detected
 *                 description: Additional disease notes
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - APPROVED
 *                   - REJECTED
 *                 example: APPROVED
 *     responses:
 *       201:
 *         description: Blood test report created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */
router.post("/", authMiddleware, authorizeRoles("STAFF"), createReport);

export default router;
