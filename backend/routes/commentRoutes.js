require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const { v4: uuidv4 } = require("uuid");

router.get('/', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

router.get('/:uuid', async (req, res) => {
    const comment = await Comment.findOne({ uuid: req.params.uuid });
    res.json(comment);
});

router.get('/profile/:uuid', async (req, res) => {
    const profile = await User.findOne({ uuid: req.params.uuid });
    const comments = await Comment.find({ profile: profile});
    res.json(comments);
});

/*
router.post('/', async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ uuid: uuidv4(), email, firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
*/
router.put('/:uuid', async (req, res) => {
    const { firstName, lastName, gender, birthDate, adress, avatar, password, description } = req.body;
    const { uuid } = req.params;
    try {
        const updatedUser = await User.updateOne({ uuid }, { firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

router.get('/address', async (req,res) => {
    const users = await User.find();
    console.log(users);
    const usersWithAddresses = users.filter(user => user.address !== null)
    console.log(usersWithAddresses);
    res.json(users);
})

module.exports = router;