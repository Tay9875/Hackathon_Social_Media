const JsonWebToken = require("../functions/JsonWebToken");

const signup = async (req, res) => {
    const { firstName, lastName, gender, birthDate, email, adress, avatar, password, description } = req.body;
    if(!firstName || !lastName || !birthDate || !email || !password) return res.status(400).json({ message: 'Missing required fields' });
    try {
        const newUser = await User.create({ uuid: uuidv4(), email, firstName, lastName, gender, birthDate, adress, avatar, password, description });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}