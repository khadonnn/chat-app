import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,
    isTyping: false,
    isSendingMessage: false,
    onlineUsers: [],
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
            set({ messages: res.data });
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
    // sendMessage: async (messageData) => {
    //     const { selectedUser, messages } = get()
    //     try {
    //         const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
    //         set({ messages: [...messages, res.data] });

    //     } catch (error) {
    //         toast.error(error.response.data.message);
    //     }
    // },

    // todo: optimiz this one later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));