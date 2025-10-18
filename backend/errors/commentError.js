const AppError = require("./appError");

class CommentError extends AppError {
  static notFound() {
    return new CommentError("Comment not found", 404);
  }

  static messageTooLong() {
    return new CommentError("Message is too long, the maximum length is 1000 characters", 400);
  }

  static missingFields() {
    return new CommentError("Missing required fields", 400);
  }

  static unauthorizedEdit() {
    return new CommentError("You cannot edit someone else's comment", 403);
  }
}

module.exports = CommentError;