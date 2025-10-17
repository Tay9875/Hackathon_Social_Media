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
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: false,
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: "targetModel"
    },
    targetModel: {
        type: String,
        required: true,
        enum: ["User", "Post"],
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", commentSchema);