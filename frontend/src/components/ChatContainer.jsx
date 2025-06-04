import { useChatStore } from '../store/useChatStore';
import { useEffect, useRef } from 'react';
import MessageInput from './MessageInput';
import ChatHeader from './ChatHeader';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
const ChatContainer = () => {
    const {
        messages,
        getMessages,
        isMessagesLoading,
        selectedUser,
        subscribeToMessages,
        unsubscribeFromMessages,
        pinnedMessage,
        pinMessage,
    } = useChatStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    useEffect(() => {
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [
        selectedUser._id,
        getMessages,
        subscribeToMessages,
        unsubscribeFromMessages,
    ]);
    //ref
    useEffect(() => {
        if (messageEndRef.current && messages)
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    if (isMessagesLoading) {
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
            {/* Phần hiển thị tin nhắn được ghim */}
            {pinnedMessage && (
                <div className='relative bg-yellow-100 p-3 rounded-lg border-l-4 border-yellow-500 m-4 h-[60px] overflow-hidden flex items-center justify-between'>
                    <div className='flex items-center gap-2 overflow-hidden'>
                        <p className='text-sm font-medium text-gray-800 shrink-0'>
                            📌 Ghim:
                        </p>
                        {pinnedMessage?.image && (
                            <img
                                src={pinnedMessage.image}
                                alt='pinned'
                                className='h-[40px] w-auto rounded shrink-0'
                            />
                        )}
                        {pinnedMessage?.text && (
                            <p className='text-gray-700 truncate'>
                                {pinnedMessage.text}
                            </p>
                        )}
                    </div>

                    {/* Nút đóng */}
                    <button
                        onClick={() => pinMessage(pinnedMessage._id, false)}
                        className='text-gray-500 hover:text-red-600 ml-4'
                        title='Bỏ ghim'
                    >
                        ❌
                    </button>
                </div>
            )}

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

                            {/* Nút ghim/bỏ ghim */}
                            <button
                                onClick={() =>
                                    pinMessage(message._id, !message.isPinned)
                                }
                                className='absolute top-1 right-2 text-sm opacity-0 group-hover:opacity-100 transition'
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
