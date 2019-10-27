class ApiError extends Error {
  constructor({ status, statusText, remainingLimit }) {
    super(statusText);
    this.status = status;
    this.remainingLimit = remainingLimit;
  }
}

export default ApiError;
