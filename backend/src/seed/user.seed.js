import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users

    {
        email: "james.anderson@example.com",
        fullName: "James Anderson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/16.jpg",
    },
    {
        email: "william.clark@example.com",
        fullName: "William Clark",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/26.jpg",
    },
    {
        email: "benjamin.taylor@example.com",
        fullName: "Benjamin Taylor",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    {
        email: "lucas.moore@example.com",
        fullName: "Lucas Moore",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/46.jpg",
    },
    {
        email: "henry.jackson@example.com",
        fullName: "Henry Jackson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/56.jpg",
    },
    {
        email: "alexander.martin@example.com",
        fullName: "Alexander Martin",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/66.jpg",
    },
    {
        email: "daniel.rodriguez@example.com",
        fullName: "Daniel Rodriguez",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/76.jpg",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        await User.insertMany(seedUsers);
        console.log("Database seeded successfully");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};
//node src/seed/user.seed.js
// Call the function
seedDatabase();