import { useRoomStore } from '../../store/useRoomStore';
import { useAuthStore } from '../../store/useAuthStore';
import { useEffect, useRef } from 'react';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import { formatMessageTime } from '../../lib/utils';
import GroupChatHeader from './GroupChatHeader';
import GroupMessageInput from './GroupMessageInput';
import { useMemo } from 'react';

const RoomChatContainer = () => {
    const {
        selectedRoom,
        messages,
        isMessagesLoading,
        getMessagesByRoom,
        subscribeToRoomMessages,
        unsubscribeFromRoomMessages,
        // Thêm dòng này
        pinRoomMessage,
        pinnedMessages,
        participants,
        getRoomParticipants,
    } = useRoomStore();
    console.log('selectedRoom', selectedRoom);
    const { authUser } = useAuthStore();

    const messageEndRef = useRef(null);

    useEffect(() => {
        if (selectedRoom?._id) {
            getMessagesByRoom(selectedRoom._id);
            getRoomParticipants(selectedRoom._id);
            subscribeToRoomMessages();
        }
        return () => unsubscribeFromRoomMessages();
    }, [selectedRoom?._id]);

    // console.log('participantMap:', participantMap);
    // console.log('msg.senderId:', messages[0]?.senderId);
    // console.log('authUser._id:', authUser._id);
    // Thêm authUser vào map để dùng chung
    const participantMap = useMemo(() => {
        const map = {};
        map[authUser._id] = authUser;

        if (Array.isArray(participants)) {
            participants.forEach((p) => {
                map[p._id] = p;
            });
        }

        return map;
    }, [participants, authUser]);

    // Thêm các thành viên khác vào map
    participants.forEach((p) => {
        participantMap[p._id] = p;
    });
    useEffect(() => {
        if (messageEndRef.current) {
            messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    if (!selectedRoom)
        return <div className='p-4'>Chọn một phòng để bắt đầu</div>;
    if (isMessagesLoading) return <MessageSkeleton />;

    return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <GroupChatHeader />
            {/* Phần hiển thị tin nhắn được ghim */}
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

                    {/* Nút bỏ ghim tin mới nhất */}
                    <button
                        onClick={() =>
                            pinRoomMessage(pinnedMessages.at(-1)._id, false)
                        }
                        className='text-gray-500 hover:text-red-600 ml-4'
                        title='Bỏ ghim'
                    >
                        ❌
                    </button>
                </div>
            )}
            <div className='flex-1 overflow-y-auto p-4 space-y-4'>
                {messages.map((msg) => {
                    // Lấy _id từ msg.senderId
                    const senderIdString = msg.senderId?._id?.toString();

                    // So sánh _id dưới dạng string
                    const isMe = senderIdString === authUser._id?.toString();

                    // Lấy thông tin người gửi từ participantMap
                    const sender = participantMap[senderIdString];

                    return (
                        <div
                            key={msg._id}
                            ref={messageEndRef}
                            className={`chat ${
                                isMe ? 'chat-end' : 'chat-start'
                            }`}
                        >
                            {/* Avatar */}
                            <div className='chat-image avatar'>
                                <div className='size-10 rounded-full border'>
                                    <img
                                        src={
                                            isMe
                                                ? authUser.profilePic
                                                : sender?.profilePic ||
                                                  '/avatar.png'
                                        }
                                        alt={
                                            isMe
                                                ? authUser.fullName
                                                : sender?.fullName ||
                                                  'user avatar'
                                        }
                                    />
                                </div>
                            </div>

                            {/* Tên người gửi */}
                            <div className='chat-header mb-1'>
                                {!isMe && (
                                    <span className='text-xs opacity-75 mr-2'>
                                        {sender?.fullName || 'Người dùng'}
                                    </span>
                                )}
                                <time className='text-xs opacity-50'>
                                    {formatMessageTime(msg.createdAt)}
                                </time>
                            </div>

                            {/* Nội dung tin nhắn */}
                            <div className='chat-bubble relative group'>
                                {msg.image && (
                                    <img
                                        src={msg.image}
                                        alt='attached'
                                        className='sm:max-w-[200px] rounded-lg mb-2'
                                    />
                                )}
                                {msg.text && <p>{msg.text}</p>}

                                {/* Nút ghim/bỏ ghim */}
                                <button
                                    onClick={() =>
                                        pinRoomMessage(msg._id, !msg.isPinned)
                                    }
                                    className='absolute top-0 right-0 text-sm opacity-100 md:opacity-0 md:hover:opacity-100 transition'
                                    title={msg.isPinned ? 'Bỏ ghim' : 'Ghim'}
                                >
                                    📌
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
            <GroupMessageInput roomId={selectedRoom._id} />
        </div>
    );
};

export default RoomChatContainer;
