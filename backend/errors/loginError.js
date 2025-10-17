const AppError = require("./appError");

class LoginError extends AppError {
    static existingEmailAndPassword() {
      return new LoginError("Email and password are required", 400);
    }

    static incorrectPassword() {
        return new LoginError("Password incorrect", 401);
    }
    /*
    static missingToken() {
      return new AuthError("No token provided", 401);
    }
  
    static invalidToken() {
      return new AuthError("Invalid or expired token", 401);
    }
  
    static sessionInvalid() {
      return new AuthError("Session invalid — please re-login", 401);
    }
  
    static unauthorized() {
      return new AuthError("Unauthorized access", 403);
    }
      */
}

module.exports = LoginError;