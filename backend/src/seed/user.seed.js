import { config } from "dotenv";
import { connectDB } from "../lib/db.js"; // Giả định hàm kết nối DB của bạn
import User from "../models/user.model.js"; // Import Mongoose Model
import bcrypt from "bcryptjs"; // <-- Quan trọng: Import thư viện mã hóa

config();

const seedUsers = [
    // Male Users (Đã chuyển sang tên Việt Nam)
    // Tên và email của bạn
    {
        email: "khadon@gmail.com",
        fullName: "khadon",
        password: "123456", // <-- Mật khẩu cần được mã hóa
        profilePic: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        email: "test@example.com",
        fullName: "Test User",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/men/45.jpg"
    },
    // ... các user khác
    {
        email: "anh.anderson@example.com",
        fullName: "Nguyễn Văn Anh",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/41.jpg", 
    },
    // ... thêm tất cả 6 user còn lại vào đây
    {
        email: "nam.rodriguez@example.com",
        fullName: "Đỗ Xuân Nam",
        password: "123456",
        profilePic: "https://randomuser.me/api/portraits/women/22.jpg", 
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();
        console.log("Database connected.");

        // 1. Xóa dữ liệu cũ để tránh lỗi trùng lặp E11000
        await User.deleteMany({});
        console.log("Existing users cleared successfully.");

        // 2. Tạo Salt (Độ phức tạp)
        const salt = await bcrypt.genSalt(10);
        const usersToInsert = [];

        // 3. Lặp và Mã hóa Mật khẩu cho từng User
        for (const user of seedUsers) {
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(user.password, salt);

            // Đẩy user mới với mật khẩu đã mã hóa vào mảng chèn
            usersToInsert.push({
                ...user,
                password: hashedPassword, // Thay thế mật khẩu "123456" bằng chuỗi mã hóa
            });
        }

        // 4. Chèn Dữ liệu đã mã hóa
        const insertedUsers = await User.insertMany(usersToInsert);
        console.log(`Database seeded successfully: ${insertedUsers.length} users created with hashed passwords.`);

        process.exit(0); 

    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1); 
    }
};

// Chạy hàm
seedDatabase();