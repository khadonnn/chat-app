import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore.js';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { Plus, X } from 'lucide-react';
import SearchInput from './chat-function/SearchInput';
import { useRoomStore } from '../store/useRoomStore.js';
import CreateRoomModal from './modals/CreateRoomModal.jsx';
import { confirmDeleteRoom } from './group-chat/ConfirmDeleteRoom.jsx';
const Sidebar = () => {
    const { getUsers, selectedUser, setSelectedUser, isUserLoading, users } =
        useChatStore();
    const { getRooms, rooms, handleDeleteRoom } = useRoomStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchResults, setSearchResults] = useState(null);
    const [showCreateRoomModal, setShowCreateRoomModal] = useState(false);
    // console.log('rooms', rooms);
    // console.log('useauth', useAuthStore.getState().authUser._id);
    const authUserId = useAuthStore.getState().authUser._id;

    const isCreatedRooms = rooms.filter(
        (room) => room.createdBy._id === authUserId,
    );

    useEffect(() => {
        getUsers();
        getRooms();
    }, [getUsers, getRooms]);
    const baseUsers = searchResults || users;

    const filteredUsers = showOnlineOnly
        ? baseUsers.filter((user) => onlineUsers.includes(user._id))
        : baseUsers;

    if (isUserLoading) return <SidebarSkeleton />;
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            {/* search */}
            <SearchInput users={users} onResults={setSearchResults} />
            <div className='flex justify-center lg:justify-between items-center w-full p-3'>
                <h3 className='hidden lg:block text-xs font-medium text-zinc-500 uppercase tracking-wide'>
                    Rooms
                </h3>
                <div className='flex-shrink-0'>
                    <button
                        className='btn btn-xs btn-ghost'
                        onClick={() =>
                            setShowCreateRoomModal(!showCreateRoomModal)
                        }
                        title='Create room'
                    >
                        <Plus className='md:w-4 h-6 w-6 md:h-4' />
                    </button>
                </div>
            </div>

            {/* Danh sách phòng */}

            {/* online users */}
            <div className='mt-3 hidden lg:flex items-center gap-2'>
                <label className='cursor-pointer flex items-center gap-2'>
                    <input
                        type='checkbox'
                        checked={showOnlineOnly}
                        onChange={(e) => setShowOnlineOnly(e.target.checked)}
                        className='checkbox checkbox-sm'
                    />
                    <span className='text-sm'>Show Online Only</span>
                </label>
                <span className='text-xs text-zinc-500'>
                    ({onlineUsers.length - 1} online)
                </span>
            </div>
            {/* todo: online filter toggle */}
            <div className='overflow-y-auto w-full py-2'>
                {rooms.map((room) => (
                    <div
                        key={`room-${room._id}`}
                        onClick={() =>
                            useRoomStore.getState().setSelectedRoom(room)
                        }
                        className={`flex items-center gap-3 p-3 w-full hover:bg-base-300 transition-all hover:cursor-pointer ${
                            useRoomStore.getState().selectedRoom?._id ===
                            room._id
                                ? 'bg-base-300 ring-1 ring-base-300'
                                : ''
                        }`}
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <div className='size-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold'>
                                {room.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                        <div className='hidden lg:block text-left min-w-0'>
                            <div className='text-sm font-medium truncate'>
                                {room.name}
                            </div>
                            <div className='text-sm text-zinc-400'>
                                {room.participants.length} members
                            </div>
                        </div>
                        {isCreatedRooms && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDeleteRoom({
                                        onConfirm: () =>
                                            handleDeleteRoom(room._id),
                                    });
                                }}
                                className=' text-red-500 hover:text-red-700 text-sm'
                            >
                                <X />
                            </button>
                        )}
                    </div>
                ))}
                {filteredUsers.map((user) => (
                    <button
                        key={`user-${user._id}`}
                        onClick={() => setSelectedUser(user)}
                        className={`flex items-center gap-3 p-3 w-full hover:bg-base-300 transition-all hover:cursor-pointer ${
                            selectedUser?._id === user._id
                                ? 'bg-base-300 ring-1 ring-base-300'
                                : ''
                        }`}
                    >
                        <div className='relative mx-auto lg:mx-0'>
                            <img
                                src={user.profilePic || '/avatar.png'}
                                alt={user.fullName}
                                className='size-12 object-cover rounded-full'
                            />
                            {onlineUsers.includes(user._id) ? (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-900' />
                            ) : (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full ring-2 ring-base-900' />
                            )}
                        </div>
                        {/* user visible on lager screens */}
                        <div className='hidden lg:block textl-left min-w-0'>
                            <div className='text-sm font-medium truncate'>
                                {user.fullName}
                            </div>
                            <div className='text-sm text-zinc-400'>
                                {onlineUsers.includes(user._id)
                                    ? 'Online'
                                    : 'Offline'}
                            </div>
                        </div>
                    </button>
                ))}
                {filteredUsers.length === 0 && (
                    <div className='text-center text-zinc-500 py-4'>
                        No online users
                    </div>
                )}
            </div>
            {/* Modal tạo phòng */}
            {showCreateRoomModal && (
                <CreateRoomModal
                    onClose={() => setShowCreateRoomModal(false)}
                />
            )}
        </aside>
    );
};
export default Sidebar;
