import { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import ImageModal from './ImageModal.jsx';

const MediaGallery = () => {
    const { messages } = useChatStore();
    const [selectedImage, setSelectedImage] = useState(null);

    // Lọc ra những message có hình ảnh
    const images = messages.filter((msg) => msg.image);

    if (images.length === 0) {
        return (
            <div className='text-center py-4 text-gray-500'>
                Không có hình ảnh nào trong cuộc trò chuyện.
            </div>
        );
    }

    return (
        <>
            <div className='grid grid-cols-2 gap-4 p-4'>
                {images.map((msg) => (
                    <div key={msg._id} className='relative group'>
                        <img
                            src={msg.image}
                            alt='message'
                            className='w-full h-auto object-cover rounded-lg shadow-sm transition-transform group-hover:scale-105 cursor-pointer'
                            onClick={() => setSelectedImage(msg.image)}
                        />
                    </div>
                ))}
            </div>

            {/* Modal hiển thị ảnh lớn */}
            {selectedImage && (
                <ImageModal
                    src={selectedImage}
                    alt='Ảnh tin nhắn'
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </>
    );
};

export default MediaGallery;
