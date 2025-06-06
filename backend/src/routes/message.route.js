import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js"
import { getUsersForSidebar, getMessages, sendMessage, pinRoomMessage, getRoomParticipants, getRoomsChat, pinMessage, createRoom, deleteRoomMessages, getRoomPinnedMessages, getRoomMessages, sendRoomMessage } from "../controllers/message.controller.js"
import upload from "../middleware/upload.js"

const router = express.Router()

router.get("/users", protectRoute, getUsersForSidebar)
router.post("/send/:id", protectRoute, upload.single('image'), sendMessage)
router.put("/:id/pin", protectRoute, pinMessage)

router.put("/rooms/pin/:messageId", protectRoute, pinRoomMessage)
router.post("/rooms/create", protectRoute, createRoom)
router.get("/rooms", protectRoute, getRoomsChat)
router.get("/rooms/:roomId", protectRoute, getRoomMessages)
router.delete("/rooms/delete/:roomId", protectRoute, deleteRoomMessages)
router.post("/rooms/send/:roomId", protectRoute, upload.single("image"), sendRoomMessage)
router.get("/rooms/:roomId/pinned", protectRoute, getRoomPinnedMessages);
router.get("/rooms/participants/:roomId", protectRoute, getRoomParticipants);


router.get("/:id", protectRoute, getMessages)

export default router