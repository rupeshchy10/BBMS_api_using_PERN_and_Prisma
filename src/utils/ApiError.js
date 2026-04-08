class ApiError extends Error {
	constructor(
		statusCode,
		message = "Something went wrong",
		errors = [],
		stack = "",
	) {
		super(message);

        // 1. Core info
		this.statusCode = statusCode;
		this.success = false;

        // 2. Message and data
		this.message = message;
		this.data = null;

        // 3. Extra details
		this.errors = errors;

        // 4.Debugging
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export { ApiError };