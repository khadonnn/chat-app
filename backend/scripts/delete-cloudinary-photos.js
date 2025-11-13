// scripts/delete-cloudinary-photos.js
import { v2 as cloudinary } from 'cloudinary';
import { config } from "dotenv";

config(); // Load biến môi trường từ .env

// Hàm này sẽ xóa toàn bộ ảnh trong các folder bạn chỉ định
const resetImages = async () => {
    // ⚠️ ĐẶT TÊN CÁC FOLDER BẠN ĐÃ DÙNG VÀO ĐÂY ⚠️
    const foldersToDelete = [
        'chat-app-profiles',    // Folder ảnh đại diện
        'chat-app-messages',    // Folder ảnh tin nhắn
        'chat-room-icons',      // Folder icon phòng chat
        // Thêm bất kỳ folder nào khác mà bạn muốn xóa
    ];

    console.log("--- BẮT ĐẦU RESET ẢNH TRÊN CLOUDINARY ---");

    for (const folder of foldersToDelete) {
        try {
            console.log(`\nĐang xóa tài nguyên trong thư mục: ${folder}...`);

            // 1. Xóa tất cả tài nguyên (ảnh) có tiền tố là tên folder
            const deletionResult = await cloudinary.api.delete_resources_by_prefix(folder);

            // Xóa xong, có thể xóa luôn cả thư mục đó (tùy chọn)
            await cloudinary.api.delete_folder(folder);

            console.log(`✅ Xóa thành công thư mục ${folder}. Số lượng tài nguyên bị xóa: ${Object.keys(deletionResult.deleted).length}`);

        } catch (error) {
            console.error(`❌ LỖI khi xử lý thư mục ${folder}:`, error.message);
        }
    }

    console.log("\n--- HOÀN TẤT QUÁ TRÌNH RESET ẢNH ---");
    process.exit(0);
};

// Gọi hàm
resetImages();