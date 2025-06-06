import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getUsersForSidebar, getMessages, sendMessage, pinMessage, createRoom } from "../controllers/message.controller.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, upload.single('image'), sendMessage)
router.put("/:id/pin", protectRoute, pinMessage)
router.post("/rooms", protectRoute, createRoom)
export default router