const AppError = require("./appError");

class TokenError extends AppError {
    static notFound() {
      return new TokenError("Token not found", 404);
    }
  
    static expired() {
      return new TokenError("Token has expired", 401);
    }
  
    static creationFailed() {
      return new TokenError("Failed to create token", 500);
    }
}

module.exports = TokenError;