import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        //hash password
        if (password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters")
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).send("User already exists");
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email,
            fullName,
            password: hashedPassword,
        });

        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ _id: newUser._id, email: newUser.email, fullName: newUser.fullName, profilePic: newUser.profilePic });
        }
    } catch (error) {
        console.log("Error in signup");
        res.status(500).json({ message: "Internal server error" })
    }
}
export const login = (req, res) => {
    res.send("login")
}
export const logout = (req, res) => {
    res.send("logout")
}