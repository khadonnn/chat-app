import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore"
export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isTyping: false,
    isSendingMessage: false,
    onlineUsers: [],
    pinnedMessage: null,
    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const res = await axiosInstance.get("/messages/users");
            set({ users: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },
    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            const messages = res.data
            const pinned = messages.find((msg) => msg.isPinned) || null;
            set({ messages, pinnedMessage: pinned });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    // muler
    sendMessage: async ({ text, imageFile }) => {
        const { selectedUser, messages } = get();

        const formData = new FormData();
        formData.append('text', text);
        if (imageFile) {
            formData.append('image', imageFile);
        }

        try {
            const res = await axiosInstance.post(
                `/messages/send/${selectedUser._id}`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }
            );
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to send message');
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        //optimize this one later
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id
            if (!isMessageSentFromSelectedUser) return;
            set({ messages: [...get().messages, newMessage] });
        })
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
    },
    pinMessage: async (messageId, isPinned) => {
        try {
            const res = await axiosInstance.put(`/messages/${messageId}/pin`, {
                isPinned,
            });

            const updatedMessage = res.data; // ✅ dùng res.data, không phải .json()

            set((state) => {
                const updatedMessages = state.messages.map((msg) =>
                    msg._id === updatedMessage._id ? updatedMessage : { ...msg, isPinned: false }
                );

                const newPinned = updatedMessage.isPinned ? updatedMessage : null;

                return {
                    messages: updatedMessages,
                    pinnedMessage: newPinned,
                };
            });

        } catch (err) {
            console.error('Pin error:', err);
            toast.error(err.response?.data?.message || 'Failed to pin message');
        }
    },

    // todo: optimiz this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));


// sendMessage: async (messageData) => {
//     const { selectedUser, messages } = get()
//     try {
//         const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
//         set({ messages: [...messages, res.data] });

//     } catch (error) {
//         toast.error(error.response.data.message);
//     }
// },