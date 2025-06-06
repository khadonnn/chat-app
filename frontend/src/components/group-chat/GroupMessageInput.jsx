import { useRef, useState } from 'react';
import { Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';
import EmojiPicker from 'emoji-picker-react';
import { useRoomStore } from '../../store/useRoomStore';
const GroupMessageInput = ({ roomId }) => {
    const [imageFile, setImageFile] = useState(null);
    const [text, setText] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const { sendMessageToRoom } = useRoomStore();
    const [open, setOpen] = useState(false);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        // 👇 Gửi file này lên server qua FormData
        setImageFile(file);

        // 👇 Chỉ dùng base64 để hiển thị preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    const removeImage = () => {
        setImagePreview(null);
        setImageFile(null); // 👈 thêm dòng này
        if (fileInputRef.current) fileInputRef.current.value = '';
    };
    // muler
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !imageFile) return;

        try {
            await sendMessageToRoom({ roomId, text: text.trim(), imageFile });
            setText('');
            setImagePreview(null);
            setImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='p-4 w-full'>
            {imagePreview && (
                <div className='mb-3 flex items-center gap-2'>
                    <div className='relative'>
                        <img
                            src={imagePreview}
                            alt='preview'
                            className='w-20 h-20 object-cover rounded-lg border border-zinc-700'
                        />
                        <button
                            className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center'
                            type='button'
                            onClick={removeImage}
                        >
                            <X className='size-4' />
                        </button>
                    </div>
                </div>
            )}
            <form
                onSubmit={handleSendMessage}
                className='flex items-center gap-2'
            >
                <div className='flex-1 flex gap-2 items-center   '>
                    <input
                        type='text'
                        className='w-full input input-bordered rounded-lg input-sm sm:input-md relative'
                        placeholder='Type a message...'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <div className=''>
                        <div
                            className='absolute bottom-7 right-32 cursor-pointer text-xl hidden md:flex'
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            🥰
                        </div>
                        {open && (
                            <div className='absolute  bottom-14 right-14 z-50'>
                                <EmojiPicker
                                    onEmojiClick={(emoji) => {
                                        setText((prev) => prev + emoji.emoji);
                                        setOpen(false);
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    <input
                        type='file'
                        className='hidden'
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept='image/*'
                    />
                    <button
                        className={`hidden sm:flex btn btn-circle ${
                            imagePreview ? 'text-emerald-500' : 'text-zinc-400'
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    type='submit'
                    className='btn btn-sm btn-circle'
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};
export default GroupMessageInput;
