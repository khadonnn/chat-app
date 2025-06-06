import express from "express";
import http from "http";
import { Server } from "socket.io";
import Room from "../models/room.model.js";
import Message from "../models/message.model.js";
import { setIO } from "../utils/socketManager.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true,
    },
});

setIO(io);
//used to store online users
const userSocketMap = {}; // {userId: socketId}

export function getRecieverSocketId(userId) {
    return userSocketMap[userId];
}

io.on("connection", (socket) => {
    console.log("Người dùng kết nối:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[userId] = socket.id;
        io.emit("getOnlineUsers", Object.keys(userSocketMap)); // Gửi danh sách online
    }

    // Join room
    socket.on("joinRoom", async (roomId) => {
        socket.join(roomId);
        console.log(`Người dùng ${userId} tham gia phòng ${roomId}`);
    });

    // Leave room
    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
        console.log(`Người dùng ${userId} rời khỏi phòng ${roomId}`);
    });

    // Gửi tin nhắn tới room
    socket.on("sendMessageToRoom", async (messageData) => {
        const { roomId, senderId, text, image } = messageData;

        const newMessage = new Message({
            senderId,
            roomId,
            text,
            image,
        });

        await newMessage.save();

        // Cập nhật lastMessage trong Room
        await Room.findByIdAndUpdate(roomId, {
            lastMessage: newMessage._id,
        });

        io.to(roomId).emit("newRoomMessage", newMessage);
    });

    socket.on("disconnect", () => {
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, server, app };


// io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);
//     const userId = socket.handshake.query.userId;
//     if (userId) userSocketMap[userId] = socket.id
//     //io.emit() is used to send events to all connected clients
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     socket.on("disconnect", () => {
//         console.log("A user disconnected", socket.id);
//         delete userSocketMap[userId];
//         io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     });
// })