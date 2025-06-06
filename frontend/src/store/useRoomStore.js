
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

export const useRoomStore = create((set, get) => ({
    messages: [],
    rooms: [],
    selectedRoom: null,
    isMessagesLoading: false,
    pinnedMessages: [],
    participants: [],
    getRooms: async () => {
        try {
            const res = await axiosInstance.get("/messages/rooms", { withCredentials: true });
            set({ rooms: res.data });
        } catch (err) {
            console.error("Lỗi tải phòng:", err);
        }
    },

    createRoom: async ({ name, participants }) => {
        try {
            const res = await axiosInstance.post("/messages/rooms/create", { name, participants });
            set({ rooms: [...get().rooms, res.data] });
            return res.data;
        } catch (err) {
            toast.error("Không thể tạo phòng");
            console.error("Lỗi tạo phòng:", err);
        }
    },

    setSelectedRoom: (room) => {
        set({ selectedRoom: room });
        if (room !== null) {
            useChatStore.getState().setSelectedUser(null);
        }
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.emit("joinRoom", room._id);
        }
    },

    getMessagesByRoom: async (roomId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/rooms/${roomId}`);
            set({ messages: res.data });
        } catch (err) {
            console.error("Lỗi tải tin nhắn:", err);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessageToRoom: async ({ roomId, text, imageFile }) => {
        const formData = new FormData();
        formData.append("text", text);
        if (imageFile) formData.append("image", imageFile);

        try {
            const res = await axiosInstance.post(`/messages/rooms/send/${roomId}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            set((state) => {
                const alreadyExists = state.messages.some((m) => m._id === res.data._id);
                if (alreadyExists) return {};
                return { messages: [...state.messages, res.data] };
            });
        } catch (error) {
            console.log("Error in sendMessageToRoom", error);
            toast.error("Gửi tin thất bại");
        }
    },

    subscribeToRoomMessages: () => {
        const socket = useAuthStore.getState().socket;

        socket.on("newRoomMessage", (msg) => {
            const { selectedRoom } = get();
            if (selectedRoom?._id === msg.roomId) {
                set({ messages: [...get().messages, msg] });
            }
        });

        socket.on("updatedRoomMessage", (updatedMsg) => {
            set((state) => {
                const updatedMessages = state.messages.map((msg) =>
                    msg._id === updatedMsg._id ? updatedMsg : msg
                );

                let updatedPinnedMessages = [...state.pinnedMessages];

                if (updatedMsg.isPinned) {
                    if (!updatedPinnedMessages.some((msg) => msg._id === updatedMsg._id)) {
                        updatedPinnedMessages.push(updatedMsg);
                    }
                } else {
                    updatedPinnedMessages = updatedPinnedMessages.filter(
                        (msg) => msg._id !== updatedMsg._id
                    );
                }

                return {
                    messages: updatedMessages,
                    pinnedMessages: updatedPinnedMessages,
                };
            });
        });
    },

    unsubscribeFromRoomMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newRoomMessage");
    },

    pinRoomMessage: async (messageId, isPinned) => {
        try {
            const res = await axiosInstance.put(`/messages/rooms/pin/${messageId}`, {
                isPinned,
            });

            const updatedMessage = res.data;

            set((state) => {
                // Cập nhật lại messages
                const updatedMessages = state.messages.map((msg) =>
                    msg._id === updatedMessage._id ? updatedMessage : msg
                );

                // Cập nhật lại pinnedMessages
                let updatedPinnedMessages = [...state.pinnedMessages];

                if (updatedMessage.isPinned) {
                    // Nếu đang ghim → thêm vào mảng pinned
                    if (!updatedPinnedMessages.some((msg) => msg._id === updatedMessage._id)) {
                        updatedPinnedMessages.push(updatedMessage);
                    }
                } else {
                    // Nếu bỏ ghim → loại bỏ khỏi mảng pinned
                    updatedPinnedMessages = updatedPinnedMessages.filter(
                        (msg) => msg._id !== updatedMessage._id
                    );
                }

                return {
                    messages: updatedMessages,
                    pinnedMessages: updatedPinnedMessages,
                };
            });
        } catch (error) {
            console.error("Lỗi khi ghim tin nhắn:", error);
            toast.error("Không thể cập nhật trạng thái ghim");
        }
    },
    handleDeleteRoom: async (roomId) => {
        try {
            await axiosInstance.delete(`/messages/rooms/delete/${roomId}`);
            set((state) => {
                const updatedRooms = state.rooms.filter((room) => room._id !== roomId);
                const isDeletedRoomSelected = state.selectedRoom?._id === roomId;

                return {
                    rooms: updatedRooms,
                    selectedRoom: isDeletedRoomSelected ? null : state.selectedRoom, // 👈 reset nếu đang ở phòng bị xoá
                };
            });

            toast.success("Đã xoá phòng");
        } catch (error) {
            console.error("Lỗi khi xóa phòng:", error);
            toast.error("Không thể xóa phòng");
        }
    },

    getRoomParticipants: async (roomId) => {
        try {
            const res = await axiosInstance.get(`/messages/rooms/participants/${roomId}`);
            const { data: participantsData } = res;

            if (!Array.isArray(participantsData)) {
                throw new Error("Dữ liệu thành viên không hợp lệ");
            }

            set({ participants: participantsData });

        } catch (error) {
            console.error("Lỗi tải người dùng trong phòng:", error);
            toast.error("Không thể tải người dùng trong phòng");
        }
    }

}));