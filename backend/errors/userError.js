const AppError = require("./appError");

class UserError extends AppError {
  static notFound() {
    return new UserError("User not found", 404);
  }

  static alreadyExists() {
    return new UserError("User already exists", 409);
  }

  static unauthorized() {
    return new UserError("You are not authorized to access this resource", 403);
  }

  static invalidCredentials() {
    return new UserError("Invalid email or password", 401);
  }

  static missingFields() {
    return new UserError("Missing required fields", 400);
  }
}

module.exports = UserError;