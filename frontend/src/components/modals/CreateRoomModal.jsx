// components/CreateRoomModal.jsx
import { useState } from 'react';
import { useChatStore } from '../../store/useChatStore';
import { useRoomStore } from '../../store/useRoomStore';

export default function CreateRoomModal({ onClose }) {
    const [name, setName] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const users = useChatStore((state) => state.users);
    const createRoom = useRoomStore((state) => state.createRoom);

    const handleSubmit = async () => {
        if (!name || selectedUsers.length < 2) {
            alert('Vui lòng chọn ít nhất 2 người và đặt tên phòng');
            return;
        }

        const participantIds = selectedUsers.map((u) => u._id);
        await createRoom({ name, participants: participantIds });
        onClose();
    };

    return (
        <div className='modal modal-open '>
            <div className='modal-box '>
                <h3 className='font-bold text-lg'>Tạo Phòng Chat</h3>

                <input
                    type='text'
                    placeholder='Tên phòng'
                    className='input input-bordered w-full mt-4'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div className='flex flex-wrap gap-2 mt-4'>
                    {selectedUsers.map((user) => (
                        <div
                            key={user._id}
                            className='badge badge-primary gap-1 px-2 py-1'
                        >
                            {user.fullName}
                            <button
                                className='ml-1 text-white'
                                onClick={() =>
                                    setSelectedUsers((prev) =>
                                        prev.filter((u) => u._id !== user._id),
                                    )
                                }
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>

                <select
                    className='select select-bordered w-full h-32 mt-2'
                    multiple
                    onChange={(e) => {
                        const selectedIds = [...e.target.selectedOptions].map(
                            (opt) => opt.value,
                        );
                        const newSelectedUsers = users.filter((u) =>
                            selectedIds.includes(u._id),
                        );

                        // Gộp với danh sách đã có, tránh trùng
                        setSelectedUsers((prev) => {
                            const all = [...prev];
                            newSelectedUsers.forEach((u) => {
                                if (!all.some((item) => item._id === u._id)) {
                                    all.push(u);
                                }
                            });
                            return all;
                        });
                    }}
                >
                    {users.map((user) => (
                        <option key={user._id} value={user._id}>
                            {user.fullName}
                        </option>
                    ))}
                </select>

                <div className='modal-action'>
                    <button className='btn btn-primary' onClick={handleSubmit}>
                        Tạo Phòng
                    </button>
                    <button className='btn' onClick={onClose}>
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );
}
