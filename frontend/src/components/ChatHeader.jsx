import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';
const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    {/* avatar */}
                    <div className='avatar relative'>
                        <div className='size-10 rounded-full '>
                            <img
                                src={selectedUser.profilePic || '/avatar.png'}
                                alt={selectedUser.fullName}
                                className='size-12 object-cover rounded-full'
                            />
                            {onlineUsers.includes(selectedUser._id) ? (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full ring-2 ring-base-900' />
                            ) : (
                                <span className='absolute bottom-0 right-0 w-3 h-3 bg-gray-500 rounded-full ring-2 ring-base-900' />
                            )}
                        </div>
                    </div>
                    {/* user info */}
                    <div className=''>
                        <h3 className='font-medium'>{selectedUser.fullName}</h3>
                        <p className='text-sm text-base-content/70'>
                            {onlineUsers.includes(selectedUser._id)
                                ? 'Online'
                                : 'Offline'}
                        </p>
                    </div>
                    {/* close button */}
                </div>
                <button onClick={() => setSelectedUser(null)}>
                    <X />
                </button>
            </div>
        </div>
    );
};
export default ChatHeader;
