import express from "express";
import {getAdmins, getMyProfile, getUsers, login, logout, register} from "../controllers/userController.js";
import { isAdmin, isAuthenticated } from "../middleware/authUser.js";
const router=express.Router()



router.post("/register",register)
router.post("/login",login)
router.get("/logout",isAuthenticated,logout)
router.get("/my-profile",isAuthenticated,getMyProfile)
router.get("/admins",getAdmins)
router.get("/users", getUsers)

export default router;