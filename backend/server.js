require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
// const postRoutes = require("./routes/postRoutes");
// const commentRoutes = require("./routes/commentRoutes");
// const tokenRoutes = require("./routes/tokenRoutes");

const app = express();
app
    .use(cors())
    .use(express.json())
    .use("/api/users", userRoutes)
    .use("/api/auth", authRoutes)
    // .use("/api/posts", postRoutes)
    // .use("/api/comments", commentRoutes)
    // .use("/api/tokens", tokenRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));

app.listen(3000, () => console.log('Serveur en local sur http://localhost:3000'));
