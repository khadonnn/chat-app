// components/chat/GroupChatHeader.jsx
import { X } from 'lucide-react';
import { useRoomStore } from '../../store/useRoomStore';

export default function GroupChatHeader() {
    const { selectedRoom, setSelectedRoom } = useRoomStore();
    if (!selectedRoom) return null;
    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* Avatar phòng */}
                    <div className='avatar relative'>
                        <div className='size-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'>
                            {selectedRoom.name.charAt(0).toUpperCase()}
                        </div>
                    </div>

                    {/* Thông tin phòng */}
                    <div>
                        <h3 className='font-medium'>{selectedRoom.name}</h3>
                        <p className='text-sm text-base-content/70'>
                            {selectedRoom.participants.length} thành viên
                        </p>
                    </div>
                </div>

                {/* Nút đóng */}
                <button onClick={() => setSelectedRoom(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
}
