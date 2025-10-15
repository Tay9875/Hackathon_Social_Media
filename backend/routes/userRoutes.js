require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

router.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.get('/:uuid', async (req, res) => {
    const user = await User.findOne({ uuid: req.params.uuid }).exec();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

router.post('/', async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ email, firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

// router.get('/adresses', async (req,res) => {
//     const adresses = await User.find({ adress: { $exists: true } });
//     res.status(200).json(adresses);
// })

module.exports = router;