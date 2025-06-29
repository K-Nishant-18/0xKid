class ApiError extends Error {
  constructor(
    statusCode,
    message = "something want wrong",
    errors = [],
    data = null,
    stack = ""
  ) {
    super(message),
      (this.statusCode = statusCode),
      (this.message = message),
      (this.errors = errors),
      (this.data = data);

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
