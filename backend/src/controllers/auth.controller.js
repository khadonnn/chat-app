import User from "../models/user.model.js";
import { generateToken } from "../lib/utils.js";
import bcrypt from "bcryptjs";
export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        //validate 
        if (!email || !fullName || !password) return res.status(400).send("Password, fullName and email are required");
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
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Invalid email or password");

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).send("Invalid email or password");
        }
        generateToken(user._id, res);
        res.status(200).json({ _id: user._id, email: user.email, fullName: user.fullName, profilePic: user.profilePic });
    } catch (error) {
        console.log("Error in login");
        res.status(500).json({ message: "Internal server error" })
    }
}
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout");
        res.status(500).json({ message: "Internal server error" })
    }
}

export const updateProfile = async (req, res) => {

}