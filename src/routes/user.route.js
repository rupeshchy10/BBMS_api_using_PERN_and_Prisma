import express from "express";
import {
    getAllUsers,
    getUserById,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    logout,
} from "../controllers/user.controller.js";
import {
    authMiddleware,
    authorizeRoles,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

// /**
//  * @swagger
//  * components:
//  *  securitySchemes:
//  *      ApiKeyAuth:
//  *          type: apiKey
//  *          in: header
//  *          name:x-api-key
//  *      Bearer:
//  *          type: http
//  *          scheme: bearer
//  *          bearerFormat: JWT
//  *  schemas:
//  *      User: 
//  *          type: object
//  *          required:
//  *              -title
//  *              -description
//  *          properties:
//  *              title:
//  *                  type: string
//  *                  description: Title of the User
//  *              description:
//  *                  type: string
//  *                  description: Detailed description of the user
//  *              status:
//  *                  type: boolean
//  *                  default: false
//  *                  description: Status of the User
//  * /
 
// /**
//  * @swagger
//  * /api/user:
//  *  post:
//  *      tags:
//  *          -users
//  *      summary: Create a new user
//  *      security:
//  *          -ApiKeyAuth: []
//  *          -Bearer: []
//  *      requestBody:    
//  *          required:true
//  *      content:
//  *          application/json:
//  *          schema:
//  *              $ref: '#/components/schemas/User'
//  *      responses:
//  *          201:
//  *              description: User created successfully
//  *          401:
//  *              description: Not authenticated
//  *          400:
//  *              description: Invalid input data
//  */

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);
router.get("/:id", authMiddleware, getUserById);

router.put("/:id", authMiddleware, updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

router.post("/logout", authMiddleware, logout);

export default router;
