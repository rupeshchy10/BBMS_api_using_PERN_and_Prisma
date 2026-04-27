// import express from "express";
// import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
// import swaggerValidator from "swagger-model-validator";

// const router = express.Router();

// const options = {
//     swaggerDefinition: {
//         openapi: "3.2.0",
//         info: {
//             title: "BBMS API",
//             version: "1.0.0",
//             description: "BBMS API documentation",
//         },
//         tags: [
//             {
//                 name: "users",
//                 description: "Todos API",
//             },
//             {
//                 name: "donations",
//                 description: "Donations API",
//             },
//         ],
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT}`,
//                 description: "Development Server",
//             },
//         ],
//         components: {
//             securitySchemes: {
//                 Bearer: {
//                     type: "http",
//                     scheme: "bearer",
//                     bearerFormat: "JWT",
//                     description: "JWT key authorization for API",
//                 },
//                 ApiKeyAuth: {
//                     type: "apiKey",
//                     in: "header",
//                     name: "x-api-key",
//                     description: "API key authorization for API",
//                 },
//             },
//         },
//     },
//     apis: ["./src/routes/*.js"],
// };

// const swaggerSpec = swaggerJSDoc(options);

// // Initialize with the swagger specification object
// swaggerValidator(swaggerSpec);

// router.get("/json", (req, res) => {
//     res.setHeader("Content-Type", "application/json");
//     res.send(swaggerSpec);
// });

// router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// export default router;

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
        // tags: [
        //     {
        //         name: "users",
        //         description: "Todos API",
        //     },
        //     {
        //         name: "donations",
        //         description: "Donations API",
        //     },
        // ],
        servers: [
            {
                url: `http://localhost:${process.env.PORT}`,
                description: "Development Server",
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
