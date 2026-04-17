import * as reportService from "../services/bloodTestReport.service.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createReportSchema } from "../validators/bloodTestReport.validator.js";

// CREATE REPORT
export const createReport = asyncHandler(async (req, res) => {
    const parsedData = createReportSchema.safeParse(req.body);

    if (!parsedData.success) {
        const errors = parsedData.error.issues.map((e) => ({
            field: e.path[0],
            message: e.message,
        }));
        throw new ApiError(400, "Validation failed", errors);
    }

    const newReport = await reportService.createReport(
        req.user.id,
        parsedData.data
    );

    res.status(201).json(
        new ApiResponse(201, newReport, "Test Report created successfully")
    );
});
