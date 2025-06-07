// ImagePreviewModal.jsx
import { X } from 'lucide-react';

const ImagePreviewModal = ({ src, onClose }) => {
    return (
        <div
            className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fadeIn'
            onClick={onClose}
        >
            {/* Nút đóng */}
            <button
                className='absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition'
                onClick={onClose}
            >
                <X size={24} />
            </button>

            {/* Hình ảnh */}
            <img
                src={src}
                alt='Xem trước'
                className='max-w-[90vw] max-h-[90vh] object-contain rounded shadow-lg transition-transform transform hover:scale-105 duration-300'
                onClick={(e) => e.stopPropagation()} // Ngăn click vào ảnh làm tắt modal
            />

            {/* Overlay chặn click qua */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ImagePreviewModal;
