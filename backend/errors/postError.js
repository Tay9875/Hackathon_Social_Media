const AppError = require("./appError");

class PostError extends AppError {
  static notFound() {
    return new PostError("Post not found", 404);
  }

  static MessageTooBig() {
    return new PostError("Message is too big", 400);
  }

  static missingFields() {
    return new PostError("Missing required fields", 400);
  }

  static unauthorizedEdit() {
    return new PostError("You cannot edit someone else's post", 403);
  }
}

module.exports = PostError;