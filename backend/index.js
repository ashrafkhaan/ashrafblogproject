import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import cookieParser from "cookie-parser";

import router from "./routes/userRoute.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4002;
const MONGO_URL = process.env.MONGO_URL;

// Cloudinary Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
});

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://ashrafblogproject.vercel.app",
        ],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// Routes
app.use("/api/users", router);
app.use("/api/blogs", blogRoute);

// Start Server
const startServer = async() => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");

        // Cloudinary Test
        try {
            const ping = await cloudinary.api.ping();
            console.log("PING SUCCESS:", ping);
        } catch (err) {
            console.log("PING ERROR:", err);
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log("MongoDB Error:", error.message);
        process.exit(1);
    }
};

startServer();