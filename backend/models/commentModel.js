const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const commentSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
});

module.exports = mongoose.model("Comment", commentSchema);