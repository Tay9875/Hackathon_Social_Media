require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

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
    const user = await User.findById(req.params.uuid);
    res.json(user);
});

app.post('/api/users', async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ uuid, email, firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/users/messages', async (req, res) => {
    
})