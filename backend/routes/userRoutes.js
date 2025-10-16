require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

//retrieve all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

//retrieve user with uuid
router.get('/:uuid', async (req, res) => {
    const user = await User.findOne({ uuid: req.params.uuid });
    res.json(user);
});

//create user
router.post('/', async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, address, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ uuid: uuidv4(), email, firstName, lastName, gender, birthDate, address, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//modify user
router.put('/:uuid', async (req, res) => {
    const { firstName, lastName, gender, birthDate, address, avatar, password, description } = req.body;
    const { uuid } = req.params;
    try {
        const updatedUser = await User.updateOne({ uuid }, { firstName, lastName, gender, birthDate, address, avatar, password, description });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

//delete user
router.delete('/:uuid', async (req, res) => {
    try {
        const deletedUser = await User.deleteOne({ uuid: req.params.uuid });
        res.status(200).json(deletedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

module.exports = router;