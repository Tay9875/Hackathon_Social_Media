const mongoose = require("mongoose");
const User = require("./userModel");
const { v4: uuidv4 } = require("uuid");

const chatSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    messages: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    createdBy: {
        type: User.schema,
        required: true,
    },
});

module.exports = mongoose.model("Chat", chatSchema);