import swaggerJSDoc from "swagger-jsdoc";
import swaggerValidator from "swagger-model-validator";

const options = {
    definition: {
        openapi: "3.2.0",
        info: {
            title: "Blood Bank Management System API",
            version: "1.0.0",
            description: "BBMS Backend API Documentation",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "Development Server",
            },
        ],
        tags: [
            {
                name: "Users",
                description: "User management APIs",
            },
            {
                name: "Donations",
                description: "Blood donation APIs",
            },
            {
                name: "Blood Requests",
                description: "Blood request APIs",
            },
            {
                name: "Blood Test Reports",
                description: "Blood test report APIs",
            },
            {
                name: "Blood Inventory",
                description: "Blood inventory APIs",
            },
            {
                name: "Notifications",
                description: "Notification APIs",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "JWT key authorization for API",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
swaggerValidator(swaggerSpec);

export default swaggerSpec;
