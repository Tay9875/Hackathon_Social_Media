require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const Chat = require("../models/commentModel");
const Post = require("../models/postModel");
const Token = require("../models/tokenModel");

const app = express();
app
    .use(cors())
    .use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));

app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

app.get('/api/users/:uuid', async (req, res) => {
    const user = await User.findByUuid(req.params.uuid);
    res.json(user);
});

app.post('/api/users', async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ uuid: uuidv4(), email, firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/users/:uuid', async (req, res) => {
    const { firstName, lastName, gender, birthDate, adress, avatar, password, description } = req.body;
    const { uuid } = req.params;
    try {
        const updatedUser = await User.updateOne({ uuid }, { firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})
