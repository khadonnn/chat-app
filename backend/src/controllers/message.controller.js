import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieverSocketId, io } from "../lib/socket.js";
import Room from "../models/room.model.js";
import mongoose from "mongoose";
import { getIO } from "../utils/socketManager.js";
export const getUsersForSidebar = async (req, res) => {
    try {
        const loggInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggInUserId } }).select("-password");

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUserForSidebar");
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ]
        })
        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessages");
        res.status(500).json({ message: "Internal server error" })
    }

}
// multer
export const sendMessage = async (req, res) => {
    try {
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl = null;

        if (req.file) {
            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({ resource_type: 'image' }, (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).end(req.file.buffer);
            });

            imageUrl = result.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        // todo: realtime chat =>socket.io
        const recieverSocketId = getRecieverSocketId(receiverId)
        if (recieverSocketId) {
            io.to(recieverSocketId).emit("newMessage", newMessage);
        }
        res.status(200).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const pinMessage = async (req, res) => {
    try {
        const { isPinned } = req.body;
        const messageId = req.params.id;

        const messageToPin = await Message.findById(messageId);
        if (!messageToPin) {
            return res.status(404).json({ error: 'Message not found' });
        }

        // Bỏ đoạn updateMany để không bỏ ghim các tin nhắn khác

        const updatedMessage = await Message.findByIdAndUpdate(
            messageId,
            {
                isPinned,
                pinnedAt: isPinned ? new Date() : null,
            },
            { new: true }
        );

        res.json(updatedMessage);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update pin status' });
    }
}
// rooms
export const createRoom = async (req, res) => {
    const { name, participants } = req.body;
    const userId = req.user._id;

    // Đảm bảo participants là mảng và thêm người tạo vào đầu
    const members = [userId, ...(Array.isArray(participants) ? participants : [])];

    const newRoom = new Room({
        name,
        createdBy: userId,
        participants: members, // ← chỉ khai báo một lần duy nhất
    });

    await newRoom.save();

    // Có thể gửi socket tới các thành viên
    const io = getIO();
    members.forEach(memberId => {
        io.to(memberId.toString()).emit("newRoomCreated", newRoom);
    });

    res.status(201).json(newRoom);
}
export const getRoomsChat = async (req, res) => {

    try {
        const userId = req.user._id;

        if (!userId) return res.status(401).json({ error: "Unauthorized" });

        const rooms = await Room.find({
            $or: [
                { participants: userId },
                { createdBy: userId },
            ],
        }).populate("createdBy", "fullName profilePic");

        res.status(200).json(rooms);
    } catch (error) {
        console.error("Lỗi khi lấy phòng:", error);
        res.status(500).json({ error: "Không thể tải phòng", details: error.message });
    }
};


export const getRoomMessages = async (req, res) => {
    const { roomId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
        return res.status(400).json({ error: "Invalid room ID" });
    }

    try {
        const messages = await Message.find({
            roomId: new mongoose.Types.ObjectId(roomId),
        }).populate("senderId", "fullName profilePic");
        console.log("messages", messages);
        res.json(messages);
    } catch (err) {
        console.error("Lỗi khi lấy tin nhắn:", err);
        res.status(500).json({ error: "Không thể tải tin nhắn" });
    }
};
export const sendRoomMessage = async (req, res) => {
    const { text } = req.body;
    const { roomId } = req.params;
    const userId = req.user._id;

    try {
        // Kiểm tra xem người dùng có nằm trong phòng không
        const room = await Room.findById(roomId);
        if (!room || !room.participants.includes(userId)) {
            return res.status(403).json({ error: "Không có quyền gửi tin nhắn" });
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = req.file.path; // hoặc xử lý upload lên cloudinary như sendMessage
        }

        const newMessage = new Message({
            senderId: userId,
            roomId,
            text,
            image: imageUrl,
        });

        await newMessage.save();

        // Cập nhật lastMessage của phòng
        await Room.findByIdAndUpdate(roomId, {
            lastMessage: newMessage._id,
        });

        // Populate sender info để trả về cho frontend
        await newMessage.populate("senderId", "fullName profilePic");

        // Gửi realtime qua socket
        const io = getIO();
        io.to(roomId).emit("newRoomMessage", newMessage);

        // Trả về kết quả
        res.json(newMessage);
    } catch (error) {
        console.error("Lỗi khi gửi tin nhắn:", error);
        res.status(500).json({ error: "Không thể gửi tin nhắn" });
    }
};
export const pinRoomMessage = async (req, res) => {
    const { messageId } = req.params;
    const { isPinned } = req.body; // true or false
    const userId = req.user._id;

    try {
        // Bước 1: Tìm tin nhắn theo ID
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ error: "Không tìm thấy tin nhắn" });
        }

        // Bước 2: Kiểm tra xem tin nhắn có phải thuộc một phòng không
        if (!message.room) {
            return res.status(400).json({ error: "Tin nhắn này không thuộc nhóm chat" });
        }

        // Bước 3: Kiểm tra người dùng có phải thành viên của phòng không
        const room = await Room.findById(message.room).populate("participants");

        if (!room) {
            return res.status(404).json({ error: "Không tìm thấy phòng chat" });
        }

        const isParticipant = room.participants.some((user) =>
            user._id.equals(userId)
        );

        if (!isParticipant) {
            return res.status(403).json({ error: "Bạn không có quyền thực hiện hành động này" });
        }

        // Bước 4: Cập nhật trạng thái ghim
        message.isPinned = isPinned;
        message.pinnedAt = isPinned ? new Date() : null;

        await message.save();

        // Bước 5: Populate lại sender để trả về dữ liệu đầy đủ cho client
        await message.populate("sender", "name avatar");

        res.json(message);
    } catch (err) {
        console.error("Lỗi khi cập nhật trạng thái ghim:", err);
        res.status(500).json({ error: "Không thể cập nhật trạng thái ghim" });
    }
};
// GET /messages/rooms/:roomId/pinned
export const getRoomPinnedMessages = async (req, res) => {
    const { roomId } = req.params;

    try {
        const messages = await Message.find({
            room: roomId,
            isPinned: true,
        }).populate("senderId", "fullName image");

        res.json(messages);
    } catch (err) {
        console.error("Lỗi khi lấy tin nhắn ghim:", err);
        res.status(500).json({ error: "Không thể tải tin nhắn ghim" });
    }
};
export const deleteRoomMessages = async (req, res) => {
    const { roomId } = req.params;
    const userId = req.user._id;

    try {
        // Tìm phòng theo ID
        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ error: "Phòng không tồn tại" });
        }

        // Kiểm tra xem người dùng có phải là người tạo phòng không
        if (room.createdBy.toString() !== userId.toString()) {
            return res.status(403).json({ error: "Chỉ người tạo phòng mới được xóa đoạn chat" });
        }

        // Xóa tất cả tin nhắn trong phòng
        await Message.deleteMany({ roomId });

        // Xóa thật sự phòng khỏi database
        await Room.findByIdAndDelete(roomId);

        // Gửi realtime event cho client để clear UI
        const io = getIO();
        io.to(roomId).emit("roomMessagesDeleted", { roomId });

        res.json({ message: "Đoạn chat đã được xóa" });
    } catch (error) {
        console.error("Lỗi khi xóa đoạn chat:", error);
        res.status(500).json({ error: "Không thể xóa đoạn chat" });
    }
};
// controllers/room.controller.js
export const getRoomParticipants = async (req, res) => {
    try {
        const { roomId } = req.params;
        const room = await Room.findById(roomId).populate("participants", "fullName profilePic _id");
        if (!room) {
            return res.status(404).json({ error: "Phòng không tồn tại" });
        }

        res.json(room.participants);
    } catch (error) {
        console.error("Lỗi khi lấy thành viên:", error);
        res.status(500).json({ error: "Không thể lấy danh sách thành viên" });
    }
};