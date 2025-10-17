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
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);