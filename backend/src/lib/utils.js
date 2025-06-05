import jwt from "jsonwebtoken";
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.cookie("jwt", token, {
        httpOnly: true, //httpOnly: prevent XSS attacks cross-site-scripting attacks
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        maxAge: 1 * 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV !== "development",
    });
    return token
}