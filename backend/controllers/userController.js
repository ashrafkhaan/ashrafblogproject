import { User } from "../models/user.model.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
import { createTokenAndSaveCookies } from "../jwt/AuthToken.js";

export const register = async(req, res) => {
    try {
        const { name, email, phone, password, education, role } = req.body;

        if (!name || !email || !phone || !password || !education || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exist" });
        }


        const existingPhone = await User.findOne({ phone });

        if (existingPhone) {
            return res.status(400).json({
                message: "Phone number already registered",
            });
        }

        if (!req.files || !req.files.photo) {
            return res.status(400).json({ message: "User photo is required" });
        }

        const { photo } = req.files;

        const allowedFormats = ["image/jpg", "image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(photo.mimetype)) {
            return res.status(400).json({ message: "Invalid photo format" });
        }

        console.log("Photo:", photo);
        console.log("Temp File Path:", photo.tempFilePath);
        console.log("Mime Type:", photo.mimetype);

        let cloudinaryResponse;

        try {
            cloudinaryResponse = await cloudinary.uploader.upload(
                photo.tempFilePath, {
                    folder: "blog-app",
                    resource_type: "auto",
                    overwrite: true,
                }
            );

            console.log("Cloudinary Success:", cloudinaryResponse);

        } catch (err) {
            console.error("Cloudinary Error:", err);
            console.error("Cloudinary Error Message:", err.message);
            console.error("Cloudinary Full Error:", JSON.stringify(err, null, 2));

            throw err;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            phone,
            password: hashPassword,
            education,
            role,
            photo: {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
        });

        await newUser.save();

        const token = await createTokenAndSaveCookies(newUser._id, res);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                photo: newUser.photo,
            },
            token,
        });
    } catch (error) {
        console.log("========== REGISTER ERROR ==========");
        console.log(error);
        console.log("Message:", error.message);

        if (error.response) {
            console.log("Response:", error.response);
        }
        return res.status(500).json({
            message: error.message,
        });

    }
};





export const login = async(req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Please fill required fields" });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        if (user.role !== role) {
            return res.status(400).json({ message: `Given role ${role} not found` });
        }

        const token = await createTokenAndSaveCookies(user._id, res);

        return res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                photo: user.photo,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: true,
            sameSite: "strict"
        });

        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


export const getMyProfile = async(req, res) => {
    const user = await req.user;
    res.status(200).json(user);
};


export const getAdmins = async(req, res) => {
    const admins = await User.find({ role: "admin" });
    res.status(200).json({ admins });
};

// new change
export const getUsers = async(req, res) => {
    const users = await User.find({ role: "user" });
    res.status(200).json({ users });
};