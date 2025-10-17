const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const UserError = require("../errors/userError");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getMe = async (req, res) => {
    try {
        const user = await User.findOne({ uuid: req.userUuid });
        if (!user) throw UserError.notFound();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getUserByUuid = async (req, res) => {
    try {
        const user = await User.findOne({ uuid: req.params.uuid });
        if (!user) throw UserError.notFound();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const createUser = async (req, res) => {
    try {
        const { firstName, lastName, gender, birthDate, email, address, avatar, password, description } = req.body;
        if(!firstName || !lastName || !birthDate || !email || !password) throw UserError.missingFields();
        const existingUser = await User.findOne({ email });
        if (existingUser) throw UserError.alreadyExists();
        const newUser = await User.create({ 
            uuid: uuidv4(), 
            firstName: firstName, 
            lastName: lastName, 
            gender: gender, 
            birthDate: birthDate, 
            email: email, 
            address: address, 
            avatar: avatar, 
            password: password, 
            description: description 
        });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, gender, birthDate, address, avatar, password, description } = req.body;
        const user = await User.findOne({ uuid });
        if (!user) throw UserError.notFound();
        if (user.uuid !== req.userUuid) throw UserError.unauthorized();
        const updatedUser = await User.updateOne({ uuid: req.userUuid }, { firstName, lastName, gender, birthDate, address, avatar, password, description });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findOne({ uuid: req.params.uuid });
        if (!deletedUser) throw UserError.notFound();
        console.log(deletedUser.uuid, req.userUuid);
        if (deletedUser.uuid !== req.userUuid) throw UserError.unauthorized();
        await deletedUser.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getAllUsers, getMe, getUserByUuid, createUser, updateUser, deleteUser };