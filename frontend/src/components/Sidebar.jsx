import { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import SidebarSkeleton from './skeletons/SidebarSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { Users } from 'lucide-react';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
        useChatStore();
    const { onlineUsers } = useAuthStore();
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    if (isUserLoading) return <SidebarSkeleton />;
    return (
        <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
            <div className='border-b border-base-300 w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>
                        Contacts
                    </span>
                </div>
            </div>

            {/* todo: online filter toggle */}
            <div className='overflow-y-auto w-full py-2'>
                {users.map((user) => (
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
            </div>
        </aside>
    );
};
export default Sidebar;
