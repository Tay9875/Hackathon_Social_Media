const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const postSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    content: {
        type: String,
        required: true,
    },
    images : [{
        type: String,
    }],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);