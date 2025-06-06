import { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { Plus, Users } from 'lucide-react';
import SearchInput from './chat-function/SearchInput';

const Sidebar = () => {
    const { getUsers, selectedUser, setSelectedUser, isUserLoading, users } =
        useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
        getUsers();
    }, [getUsers]);
    const baseUsers = searchResults || users;

    const filteredUsers = showOnlineOnly
        ? baseUsers.filter((user) => onlineUsers.includes(user._id))
        : baseUsers;

    if (isUserLoading) return <SidebarSkeleton />;
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            {/* search */}
            <SearchInput users={users} onResults={setSearchResults} />
            <div className='border-b border-base-300 w-full p-4 flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>
                        Contacts
                    </span>
                </div>

                <div className='tooltip tooltip-right ' data-tip='Create room'>
                    <button className='btn btn-xs btn-ghost'>
                        <Plus className='size-6' />
                    </button>
                </div>
            </div>

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
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
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
        </aside>
    );
};
export default Sidebar;
