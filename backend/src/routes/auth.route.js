import express from "express";
const router = express.Router()
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js"
import { protectRoute } from "../middleware/auth.middleware.js"
router.post("/login", login)
router.post("/logout", logout)
router.post("/signup", signup)

router.put("/update-profile", protectRoute, updateProfile)
export default router