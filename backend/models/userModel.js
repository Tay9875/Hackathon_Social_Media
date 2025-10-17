const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const userSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
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
    address: {
        type: String,
        default: "But where do I live though?!",
        maxLength: 250,
        trim: true
    },
    avatar: {
        type: String,
        default: "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg",
    },
    password: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "I'm a new user",
        maxLength: 250,
        trim: true
    },
    token: {
        type: String,
        required: true,
        unique: true,
        default: uuidv4,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

// class User {
//     constructor(uuid, email, firstName, lastName, gender, birthDate, address, avatar, password, description) {
//         this.uuid = uuid;
//         this.email = email;
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.gender = gender;
//     }

//     async create() {
//         const newUser = await User.create({ uuid: uuidv4(), email, firstName, lastName, gender, birthDate, address, avatar, password, description });
//         return newUser;
//     }
    
//     async update(uuid, email, firstName, lastName, gender, birthDate, address, avatar, password, description) {
//         const updatedUser = await User.updateOne({ uuid }, { email, firstName, lastName, gender, birthDate, address, avatar, password, description });
//         return updatedUser;
//     }
    
//     async delete(uuid) {
//         const deletedUser = await User.deleteOne({ uuid });
//         return deletedUser;
//     }

//     async find(uuid) {
//         const user = await User.findOne({ uuid });
//         return user;
//     }
    
//     async findAll() {
//         const users = await User.find();
//         return users;
//     }
// }