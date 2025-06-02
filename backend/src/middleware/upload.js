import multer from 'multer';

const storage = multer.memoryStorage(); // ảnh sẽ nằm trong bộ nhớ RAM, không lưu file
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

export default upload;
