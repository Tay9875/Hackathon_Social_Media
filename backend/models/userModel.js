const mongoose = require("mongoose");
const Token = require("./tokenModel");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4(),
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"],
        default: "other",
    },
    birthDate: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/.test(value);
            },
            message: 'Invalid email address',
        },
    },
    adress: {
        type: String,
        default: "I'm a new user",
        maxLength: 250,
        trim: true
    },
    avatar: {
        type: String,
        default: "",
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,64}$/.test(value);
            },
            message:
                'The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be 8 to 64 characters long.',
        },
    },
    description: {
        type: String,
        required: true,
        default: "I'm a new user",
        maxLength: 250,
        trim: true
    },
    token: {
        type: Token.schema,
        required: true,
        unique: true,
        default: uuidv4(),
    },
})

module.exports = mongoose.model('User', userSchema);