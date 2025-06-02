import { config } from "dotenv";
import { connectDB } from "../lib/db.js";
import User from "../models/user.model.js";

config();

const seedUsers = [
    // Female Users
    {
        email: "emma.thompson@example.com",
        fullName: "Emma Thompson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/17.jpg",
    },
    {
        email: "olivia.miller@example.com",
        fullName: "Olivia Miller",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/27.jpg",
    },
    {
        email: "sophia.davis@example.com",
        fullName: "Sophia Davis",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/37.jpg",
    },
    {
        email: "ava.wilson@example.com",
        fullName: "Ava Wilson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
        email: "isabella.brown@example.com",
        fullName: "Isabella Brown",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/57.jpg",
    },
    {
        email: "mia.johnson@example.com",
        fullName: "Mia Johnson",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    {
        email: "charlotte.williams@example.com",
        fullName: "Charlotte Williams",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/77.jpg",
    },
    {
        email: "amelia.garcia@example.com",
        fullName: "Amelia Garcia",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/87.jpg",
    },

    // Male Users
    { email: "khadon@gmail.com", fullName: "Khadon", password: "123456", profilePic: "https://res.cloudinary.com/dtj7wfwzu/image/upload/v1748574265/v4jrhbyxbfobjpvmqozt.jpg" },
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