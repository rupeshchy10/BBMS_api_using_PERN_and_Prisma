import express from "express";
import {
    authMiddleware,
    authorizeRoles,
} from "../middlewares/auth.middleware.js";
import {
    getAllInventory,
    getInventoryByBloodGroup,
    updateInventory,
} from "../controllers/bloodInventory.controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blood Inventory
 *   description: Blood inventory management APIs
 */

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Get all blood inventory records
 *     tags: [Blood Inventory]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all blood inventory records
 *       401:
 *         description: Unauthorized
 */
router.get("/", authMiddleware, getAllInventory);

/**
 * @swagger
 * /api/v1/inventory/{bloodGroup}:
 *   get:
 *     summary: Get blood inventory by blood group
 *     tags: [Blood Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bloodGroup
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - A_POS
 *             - A_NEG
 *             - B_POS
 *             - B_NEG
 *             - O_POS
 *             - O_NEG
 *             - AB_POS
 *             - AB_NEG
 *         description: Blood group type
 *     responses:
 *       200:
 *         description: Blood inventory found
 *       404:
 *         description: Blood inventory not found
 *       401:
 *         description: Unauthorized
 */
router.get("/:bloodGroup", authMiddleware, getInventoryByBloodGroup);

/**
 * @swagger
 * /api/v1/inventory/{bloodGroup}:
 *   patch:
 *     summary: Update blood inventory quantity
 *     tags: [Blood Inventory]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bloodGroup
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - A_POS
 *             - A_NEG
 *             - B_POS
 *             - B_NEG
 *             - O_POS
 *             - O_NEG
 *             - AB_POS
 *             - AB_NEG
 *         description: Blood group type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 20
 *                 description: Updated quantity in pint
 *     responses:
 *       200:
 *         description: Blood inventory updated successfully
 *       404:
 *         description: Blood inventory not found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden access
 */
router.patch(
    "/:bloodGroup",
    authMiddleware,
    authorizeRoles("ADMIN"),
    updateInventory
);

export default router;
