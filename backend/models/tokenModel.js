const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const tokenSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    },
    tokenName: {
        type: String,
        required: true,
    },
    tokenValue: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    userAgent: {
        type: String,
        required: true,
    },
    ipAddress: {
        type: String,
        required: true,
    },
    userUuid: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);