import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useCallStore } from '../store/useVideoCallStore';
import { Video, X } from 'lucide-react';

const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { authUser, socket, onlineUsers } = useAuthStore();

    const { openCallPopup, closeCallPopup } = useCallStore();

    const handleCallClick = () => {
        if (!selectedUser || !authUser) return;

        socket.emit('call-user', {
            to: selectedUser._id,
            from: authUser._id,
            callerName: authUser.fullName,
        });

        openCallPopup({
            isCaller: true,
            callerName: authUser.fullName,
            calleeName: selectedUser.fullName,
            callerImage: authUser.profilePic || '/avatar.png',
            calleeImage: selectedUser.profilePic || '/avatar.png',
            onAccept: () => {
                console.log('Caller accepted, mở video UI');
            },
            onReject: () => {
                console.log('Caller huỷ gọi');
                socket.emit('cancel-call', { to: selectedUser._id });
                closeCallPopup();
            },
        });
    };

    return (
        <div className='p-2.5 border-b border-base-300'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
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
                    <div className=''>
                        <h3 className='font-medium'>{selectedUser.fullName}</h3>
                        <p className='text-sm text-base-content/70'>
                            {onlineUsers.includes(selectedUser._id)
                                ? 'Online'
                                : 'Offline'}
                        </p>
                    </div>
                </div>

                <div className='flex items-center justify-between gap-3'>
                    <div className='mr-16'>
                        <Video
                            className='text-success cursor-pointer'
                            onClick={handleCallClick}
                        />
                    </div>
                    <button onClick={() => setSelectedUser(null)}>
                        <X className='text-error' />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatHeader;
