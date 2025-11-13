import multer from 'multer';

// Cấu hình Multer để lưu trữ file trong bộ nhớ (Memory Storage)
// Đây là cách tốt nhất khi bạn muốn stream file đó thẳng lên Cloudinary
const storage = multer.memoryStorage();

// Khởi tạo Multer instance
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn kích thước file là 5MB
    }
});

export default upload;