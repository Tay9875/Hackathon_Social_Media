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
    images : {
        type: Array,
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
    comments: {
        type: Array,
        ref: "Comment",
        default: [],
        unique: false,
        required: false,
    },
});

module.exports = mongoose.model("Post", postSchema);