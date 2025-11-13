import Room from "../models/room.model.js";
import { v2 as cloudinary } from 'cloudinary';
import { getIO } from "../utils/socketManager.js"; // Đảm bảo import này đúng cho Socket.io

export const updateRoomIcon = async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user._id;

    try {
        const room = await Room.findById(roomId);

        if (!room) {
            return res.status(404).json({ message: "Phòng chat không tồn tại." });
        }

        // Kiểm tra quyền: Chỉ người tạo phòng (createdBy) mới được đổi icon
        // Tùy chọn: bạn có thể thay thế bằng logic kiểm tra trong mảng 'admins'
        if (room.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Bạn không có quyền thay đổi icon phòng chat này." });
        }

        // Kiểm tra file ảnh đã được upload qua Multer chưa
        if (!req.file) {
            return res.status(400).json({ message: "File ảnh là bắt buộc." });
        }

        // 1. Xóa icon cũ trên Cloudinary (nếu tồn tại)
        if (room.roomIconPublicId) {
            await cloudinary.uploader.destroy(room.roomIconPublicId);
        }

        // 2. Upload ảnh mới và áp dụng TRANSFORMATION tạo Icon
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({
                resource_type: 'image',
                folder: 'chat-room-icons', // Folder chuyên dụng cho icon phòng
                // Transformation: Crop vuông, bo tròn
                transformation: [
                    { width: 150, height: 150, gravity: "face", crop: "thumb" }, // Cắt và thay đổi kích thước
                    { radius: "max" } // Bo tròn thành hình tròn
                ]
            }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }).end(req.file.buffer); // Sử dụng buffer của file từ Multer
        });

        // 3. Cập nhật Room Model trong DB
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            {
                roomIconUrl: result.secure_url,
                roomIconPublicId: result.public_id,
            },
            { new: true }
        ).select("-lastMessage"); // Tùy chọn: loại trừ field lớn

        // 4. Gửi Socket.io event cho các thành viên trong phòng
        const io = getIO();
        io.to(roomId).emit("roomIconUpdated", updatedRoom);

        res.status(200).json(updatedRoom);

    } catch (error) {
        console.error("Lỗi trong updateRoomIcon:", error);
        res.status(500).json({ message: "Lỗi Server Nội bộ. Không thể cập nhật icon." });
    }
};