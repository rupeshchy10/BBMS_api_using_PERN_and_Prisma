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

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: User management APIs
 */

/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: John Doe
 *                          email:
 *                              type: string
 *                              example: john@gmail.com
 *                          phone:
 *                              type: string
 *                              example: "9812345678"
 *                          password:
 *                              type: string
 *                              example: John123
 *                          address:
 *                              type: string
 *                              example: Biratnagar
 *                          dob:
 *                              type: string
 *                              format: date
 *                              example: 2000-01-24
 *                          bloodGroup:
 *                              type: string
 *                              example: B+
 *                          role:
 *                              type: string
 *                              example: DONOR
 *      responses:
 *          201:
 *              description: User registered successfully
 *          400:
 *              description: Validation error
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      summary: Login user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: john@gmail.com
 *                          password:
 *                              type: string
 *                              example: john123
 *      responses:
 *          200:
 *              description: Login successful
 *          401:
 *              description: Invalid credentials
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Get all users
 *      tags: [Users]
 *      security:
 *          -bearerAuth: []
 *      responses:
 *          200:
 *              description: List of all users
 *          401:
 *              description: Unauthorized
 */
router.get("/", authMiddleware, authorizeRoles("ADMIN"), getAllUsers);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *      summary: Get user by ID
 *      tags: [Users]
 *      security:
 *          -bearerAuth: []
 *      parameters:
 *          -in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: User ID
 *      responses:
 *          200:
 *              description: User found
 *          404:
 *              description: User not found
 */
router.get("/:id", authMiddleware, getUserById);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *      summary: Update user by ID
 *      tags: [Users]
 *      security:
 *          -bearerAuth: []
 *      parameters:
 *          -in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: User ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          phone:
 *                              type: string
 *                          address:
 *                              type: string
 *                          bloodGroup:
 *                              type: string
 *      responses:
 *          200:
 *              description: User updated successfully
 *          404:
 *              description: User not found
 */
router.put("/:id", authMiddleware, updateUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *      summary: Delete user by ID
 *      tags: [Users]
 *      security:
 *          -bearerAuth: []
 *      parameters:
 *          -in: path
 *          name: id
 *          required: true
 *          schema:
 *              type: string
 *          description: User ID
 *      responses:
 *          200:
 *              description: User deleted successfully
 *          404:
 *              description: User not found
 */
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

/**
 * @swagger
 * /api/v1/users/logout:
 *  post:
 *      summary: Logout user
 *      tags: [Users]
 *      security:
 *          -bearerAuth: []
 *      responses:
 *          200:
 *              description: Logout successful
 */
router.post("/logout", authMiddleware, logout);

export default router;
