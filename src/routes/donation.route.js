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

/**
 * @swagger
 * tags:
 *   name: Donations
 *   description: Blood donation management APIs
 */

/**
 * @swagger
 * /api/v1/donations:
 *   post:
 *     summary: Create a new blood donation request
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *               - bloodGroup
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 2
 *                 description: Quantity of blood in pint
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
 *                 example: O_POS
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - APPROVED
 *                   - REJECTED
 *                   - COMPLETED
 *                 example: PENDING
 *     responses:
 *       201:
 *         description: Donation created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware, authorizeRoles("DONOR"), createDonation);

/**
 * @swagger
 * /api/v1/donations:
 *   get:
 *     summary: Get all donations
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all donations
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */
router.get(
    "/",
    authMiddleware,
    authorizeRoles("ADMIN", "STAFF"),
    getAllDonations
);

/**
 * @swagger
 * /api/v1/donations/{id}/status:
 *   patch:
 *     summary: Update donation status
 *     tags: [Donations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Donation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - APPROVED
 *                   - REJECTED
 *                   - COMPLETED
 *                 example: APPROVED
 *     responses:
 *       200:
 *         description: Donation status updated successfully
 *       404:
 *         description: Donation not found
 *       401:
 *         description: Unauthorized
 */
router.patch(
    "/:id/status",
    authMiddleware,
    authorizeRoles("STAFF"),
    updateDonationStatus
);

export default router;
