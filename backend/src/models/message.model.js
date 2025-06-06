import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
    },
    text: {
        type: String,

    },
    image: {
        type: String,
    },
    isPinned: {
        type: Boolean,
        default: false,
    },
    pinnedAt: { type: Date, default: null },
}, { timestamps: true })

messageSchema.pre('validate', function (next) {
    if (!this.receiverId && !this.roomId) {
        this.invalidate('receiverId', 'Phải có receiverId hoặc roomId');
        this.invalidate('roomId', 'Phải có receiverId hoặc roomId');
    }
    next();
});

const Message = mongoose.model("Message", messageSchema);
export default Message