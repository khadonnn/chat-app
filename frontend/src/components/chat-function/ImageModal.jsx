// src/components/ImageModal.jsx

const ImageModal = ({ src, alt, onClose }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-80 z-50 flex justify-center items-center'>
            <span
                onClick={onClose}
                className='absolute top-4 right-4 text-white text-2xl cursor-pointer'
            >
                &times;
            </span>
            <img
                src={src}
                alt={alt}
                className='max-w-full max-h-[90vh] object-contain'
            />
        </div>
    );
};

export default ImageModal;
