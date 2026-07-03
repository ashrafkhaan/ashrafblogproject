import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary'
import cookieParser from "cookie-parser";
import dns from "node:dns";


import router from "./routes/userRoute.js";
import blogRoute from "./routes/blog.route.js";




const app = express();
dotenv.config();

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const port = process.env.PORT || 4002;
const MONGO_URL = process.env.MONGO_URL;


//middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));



//db code
const startServer = async() => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");

        app.listen(port || 4002, () => {
            console.log(`Server running on ${port}`);
        });

    } catch (error) {
        console.log("MongoDB Error:", error.message);
        process.exit(1);
    }
};

startServer();


//defining routes

app.use("/api/users", router);
app.use("/api/blogs", blogRoute);



//cloudinary
cloudinary.config({

    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});

console.log(process.env.CLOUD_NAME);
console.log(process.env.CLOUD_API_KEY);
console.log(process.env.CLOUD_SECRET_KEY ? "Secret Found" : "Secret Missing");

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});