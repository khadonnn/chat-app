// routes/room.routes.js
import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import upload from '../middleware/multer.js'; // Import Multer middleware
import { updateRoomIcon } from '../controllers/room.controller.js'; // Import controller vừa tạo

const router = express.Router();

// ... các routes khác của bạn ...

// Route PUT mới để cập nhật icon phòng
// 💡 Sử dụng upload.single('icon') - Tên field trong form data phải là 'icon'
router.put(
    '/:roomId/icon',
    protectRoute,
    upload.single('icon'), // Multer sẽ xử lý file và lưu vào req.file
    updateRoomIcon
);

export default router;