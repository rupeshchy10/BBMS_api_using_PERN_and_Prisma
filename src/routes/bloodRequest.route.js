import express from "express";
import {
    createRequest,
    getAllRequests,
    updateRequestStatus,
} from "../controllers/bloodRequest.controller.js";
import { authMiddleware, authorizeRoles } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blood Requests
 *   description: Blood request management APIs
 */

/**
 * @swagger
 * /api/v1/requests:
 *   post:
 *     summary: Create a blood request
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - requesterName
 *               - phone
 *               - bloodGroup
 *               - quantity
 *             properties:
 *               requesterName:
 *                 type: string
 *                 example: Ram Sharma
 *               hospitalName:
 *                 type: string
 *                 example: Bir Hospital
 *               phone:
 *                 type: string
 *                 example: "9812345678"
 *               bloodGroup:
 *                 type: string
 *                 enum:
 *                   - A_POS
 *                   - A_NEG
 *                   - B_POS
 *                   - B_NEG
 *                   - O_POS
 *                   - O_NEG
 *                   - AB_POS
 *                   - AB_NEG
 *                 example: A_POS
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 description: Quantity of blood in pint
 *     responses:
 *       201:
 *         description: Blood request created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/",authMiddleware, createRequest);

/**
 * @swagger
 * /api/v1/requests:
 *   get:
 *     summary: Get all blood requests
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all blood requests
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */
router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "STAFF"),
    getAllRequests
);

/**
 * @swagger
 * /api/v1/requests/{id}/status:
 *   patch:
 *     summary: Update blood request status
 *     tags: [Blood Requests]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blood request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - APPROVED
 *                   - REJECTED
 *                 example: APPROVED
 *     responses:
 *       200:
 *         description: Blood request status updated successfully
 *       404:
 *         description: Blood request not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */
router.patch(
    "/:id/status",
    authMiddleware,
    authorizeRoles("STAFF"),
    updateRequestStatus
);

export default router;
