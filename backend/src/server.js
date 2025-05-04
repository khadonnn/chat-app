import express from "express"
import "dotenv/config"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import messageRoutes from "./routes/message.route.js"
const PORT = process.env.PORT | 8080
const app = express()

app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})