import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggingIn: false,
    isSigningUp: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data });
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
        } catch (error) {
            console.log("Error in login", error);
            toast.error(error.response.data.message);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.get("/auth/logout");
            set({ authUser: null });
            toast.success("Logout successful");
        } catch (error) {
            console.log("Error in logout", error);
            toast.error(error.response.data.message);
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
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
}

))