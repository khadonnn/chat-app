// utils/ConfirmDeleteRoom.tsx
import { toast } from 'react-hot-toast';

export const confirmDeleteRoom = ({ onConfirm }) => {
    toast(
        (t) => (
            <span className='flex flex-col gap-2'>
                <span>Bạn có chắc muốn xoá phòng này?</span>
                <div className='flex justify-end gap-2'>
                    <button
                        className='px-2 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600'
                        onClick={() => {
                            toast.dismiss(t.id);
                            onConfirm(); // Gọi hàm xoá từ component
                        }}
                    >
                        Xoá
                    </button>
                    <button
                        className='px-2 py-1 text-sm text-gray-600 bg-gray-200 rounded hover:bg-gray-300'
                        onClick={() => toast.dismiss(t.id)}
                    >
                        Huỷ
                    </button>
                </div>
            </span>
        ),
        { duration: 8000 },
    );
};
