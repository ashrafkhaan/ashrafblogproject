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

const port = process.env.PORT;
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
const connectDB = async() => {
    try {
        await mongoose.connect(MONGO_URL);
        console.log("MongoDB Connected");
    } catch (error) {
        console.log("MongoDB Error:", error.message);
        process.exit(1);
    }
};

connectDB();


//defining routes

app.use("/api/users", router);
app.use("/api/blogs", blogRoute);



//cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
});


app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});