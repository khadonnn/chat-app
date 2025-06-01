import express from "express"
import "dotenv/config"
import authRoutes from "./routes/auth.route.js"
import cookieParser from "cookie-parser"
import { connectDB } from "./lib/db.js"
import messageRoutes from "./routes/message.route.js"
import cors from "cors"
const PORT = process.env.PORT | 8080
const app = express()

app.use(cors({ credentials: true, origin: "http://localhost:5173" }))
app.use(cookieParser())
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectDB();
})