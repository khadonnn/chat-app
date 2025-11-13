// models/room.model.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        participants: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        admins: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        isGroup: {
            type: Boolean,
            default: true,
        },
        // --- THÊM HAI TRƯỜNG CHO ICON CLOUDINARY ---
        roomIconUrl: {
            type: String,
            default: null, // URL ảnh đã được transform thành icon
        },
        roomIconPublicId: {
            type: String,
            default: null, // Public ID để dễ dàng xóa/thay thế icon cũ trên Cloudinary
        },
        // -------------------------------------------
        lastMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    { timestamps: true }
);

const Room = mongoose.model("Room", roomSchema);
export default Room;