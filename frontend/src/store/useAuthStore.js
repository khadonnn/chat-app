import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:8080" : "/";
export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (error) {
            console.log("Error in checkAuth", error)
            set({ authUser: null, isCheckingAuth: false });
        } finally {
            set({ isCheckingAuth: false });
        }
    },
    setAuthUser: (user) => set({ authUser: user, isCheckingAuth: false }),
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            get().connectSocket();
        } catch (error) {
            console.log("Error in signup", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isSigningUp: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIn: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Login successful");

            get().connectSocket();
        } catch (error) {
            toast.error("Invalid email or password");
            console.log("Error in login", error);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful");
            get().disconnectSocket();
        } catch (error) {
            console.log("Error in logout", error);
            toast.error("Logout failed");
        }
    },
    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully");
        } catch (error) {
            console.log("error in update profile:", error);
            toast.error("Failed to update profile");
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    // socket
    connectSocket: async () => {
        const { authUser } = get();
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id
            }
        });
        socket.connect();
        set({ socket: socket }); // set the socket state in the store
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },
    disconnectSocket: async () => {
        if (get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}

))