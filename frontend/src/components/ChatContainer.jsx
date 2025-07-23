import { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import VideoCallPopup from './video-call/VideoCallPopup';

import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useCallStore } from '../store/useVideoCallStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
        pinnedMessages,
        pinMessage,
    } = useChatStore();

    const { authUser, socket } = useAuthStore();
    const { openCallPopup, closeCallPopup } = useCallStore();

    const messageEndRef = useRef(null);

    // 1. Lấy tin nhắn
    useEffect(() => {
        if (!selectedUser) return;

        getMessages(selectedUser._id);
        subscribeToMessages();

        return () => unsubscribeFromMessages();
    }, [selectedUser?._id]);

    // 2. Auto scroll
    useEffect(() => {
        if (messageEndRef.current)
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // 3. Lắng nghe sự kiện gọi đến
    useEffect(() => {
        if (!socket || !authUser) return;

        const handleIncomingCall = ({ callerId, callerName }) => {
            openCallPopup({
                isCaller: false,
                callerName,
                calleeName: authUser.fullName,
                calleeImage: selectedUser.profilePic || '/avatar.png',
                onAccept: () => {
                    socket.emit('accept-call', { to: callerId });
                    console.log('Callee accepted, mở video UI');
                },
                onReject: () => {
                    socket.emit('reject-call', { to: callerId });
                    console.log('Callee từ chối');
                },
            });
        };

        socket.on('incoming-call', handleIncomingCall);

        return () => {
            socket.off('incoming-call', handleIncomingCall);
        };
    }, [socket, authUser, openCallPopup]);

    // 4. Lắng nghe callee chấp nhận hoặc từ chối
    useEffect(() => {
        if (!socket) return;

        socket.on('call-accepted', () => {
            console.log('[caller] call accepted, open video UI');
            // TODO: Hiện UI gọi video cho caller
        });

        socket.on('call-rejected', () => {
            console.log('[caller] call rejected');
            closeCallPopup();
        });

        return () => {
            socket.off('call-accepted');
            socket.off('call-rejected');
        };
    }, [socket, closeCallPopup]);

    if (isMessagesLoading || !selectedUser) {
        return (
            <div className='flex-1 flex flex-col overflow-auto'>
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
            </div>
        );
    }

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader />
            <VideoCallPopup />

            {/* 🔖 Tin nhắn ghim */}
            {pinnedMessages.length > 0 && (
                <div className='relative bg-yellow-100 p-3 rounded-lg border-l-4 border-yellow-500 m-4 h-[60px] overflow-hidden flex items-center justify-between'>
                    <div className='flex items-center gap-2 overflow-hidden'>
                        <p className='text-sm font-medium text-gray-800 shrink-0'>
                            📌 Ghim:
                        </p>
                        {pinnedMessages.at(-1)?.image && (
                            <img
                                src={pinnedMessages.at(-1).image}
                                alt='pinned'
                                className='h-[40px] w-auto rounded shrink-0'
                            />
                        )}
                        {pinnedMessages.at(-1)?.text && (
                            <p className='text-gray-700 truncate'>
                                {pinnedMessages.at(-1).text}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() =>
                            pinMessage(pinnedMessages.at(-1)._id, false)
                        }
                        className='text-gray-500 hover:text-red-600 ml-4'
                        title='Bỏ ghim'
                    >
                        ❌
                    </button>
                </div>
            )}

            {/* 💬 Tin nhắn */}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((message) => (
                    <div
                        ref={messageEndRef}
                        key={message._id}
                        className={`chat ${
                            message.senderId === authUser._id
                                ? 'chat-end'
                                : 'chat-start'
                        }`}
                    >
                        <div className='chat-image avatar'>
                            <div className='size-10 rounded-full border'>
                                <img
                                    src={
                                        message.senderId === authUser._id
                                            ? authUser.profilePic ||
                                              '/avatar.png'
                                            : selectedUser.profilePic ||
                                              '/avatar.png'
                                    }
                                    alt='user avatar'
                                />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className='chat-bubble relative group'>
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt='attached'
                                    className='sm:max-w-[200px] rounded-lg mb-2'
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                            <button
                                onClick={() =>
                                    pinMessage(message._id, !message.isPinned)
                                }
                                className='absolute top-0 right-0 text-sm opacity-100 md:opacity-0 md:group-hover:opacity-100 transition'
                                title={message.isPinned ? 'Bỏ ghim' : 'Ghim'}
                            >
                                📌
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <MessageInput />
        </div>
    );
};

export default ChatContainer;
