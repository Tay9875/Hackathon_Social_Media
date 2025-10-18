require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const tokenRoutes = require("./routes/tokenRoutes");

const app = express();

const swaggerUiOptions = {
    explorer: true,
    customCss:'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
    customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css'
}

app
    .use(cors())
    .use(express.json())
    .use("/api/users", userRoutes)
    .use("/api/auth", authRoutes)
    .use("/api/posts", postRoutes)
    .use("/api/comments", commentRoutes)
    .use("/api/tokens", tokenRoutes)
    .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connecté à MongoDB Atlas'))
    .catch(err => console.error('❌ Erreur MongoDB:', err));

app.listen(3000, () => console.log('Serveur en local sur http://localhost:3000'));