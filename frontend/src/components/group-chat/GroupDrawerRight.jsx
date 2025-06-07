import { useEffect, useState } from 'react';
import { useRoomStore } from '../../store/useRoomStore';
import { useAuthStore } from '../../store/useAuthStore';
import {
    User,
    Users,
    Star,
    Image as LucidImage,
    LogOut,
    Moon,
    SquareChevronLeft,
    Palette,
    Pin,
    SquareChevronRight,
    Wrench,
} from 'lucide-react';
import ChangeTheme from '../chat-function/ChangeTheme';
import ImagePreviewModal from '../chat-function/ImagePreviewModal';
export const GroupDrawerRight = () => {
    const {
        selectedRoom,
        pinnedMessages,
        participants,
        getRoomParticipants,
        handleDeleteRoom,
        pinRoomMessage,
    } = useRoomStore();
    const currentUser = useAuthStore((state) => state.user);
    const [pinnedMessagesOpen, setPinnedMessagesOpen] = useState(false);
    const [, setDrawerOpen] = useState(false);
    const [changeTheme, setChangeTheme] = useState();

    useEffect(() => {
        if (selectedRoom) {
            getRoomParticipants(selectedRoom._id);
        }
    }, [selectedRoom]);

    const handleLeaveGroup = async () => {
        if (window.confirm('Bạn có chắc muốn rời nhóm này?')) {
            await handleDeleteRoom(selectedRoom._id);
            setDrawerOpen(false);
        }
    };

    const getRandomImageURL = (width, height) => {
        return `https://picsum.photos/${width}/${height}?random=${Math.floor(
            Math.random() * 10000,
        )}`;
    };

    const mediaItems = [
        { id: 1, url: getRandomImageURL(200, 300) },
        { id: 2, url: getRandomImageURL(250, 400) },
        { id: 3, url: getRandomImageURL(300, 300) },
        { id: 4, url: getRandomImageURL(300, 400) },
        { id: 5, url: getRandomImageURL(200, 300) },
        { id: 6, url: getRandomImageURL(300, 400) },
    ];
    // modal
    const [previewUrl, setPreviewUrl] = useState(null);

    return (
        <div className='drawer drawer-end'>
            <input
                id='group-drawer'
                type='checkbox'
                className='drawer-toggle'
            />

            <div className='drawer-content'>
                {/* Nút mở drawer */}
                <label
                    htmlFor='group-drawer'
                    className='drawer-button btn btn-xs !px-0 tooltip tooltip-left'
                    data-tip='open sidebar'
                >
                    <SquareChevronLeft />
                </label>
            </div>

            <div className='drawer-side'>
                {/* Overlay bấm ngoài đóng drawer */}
                <label
                    htmlFor='group-drawer'
                    className='drawer-overlay'
                    aria-label='close sidebar'
                ></label>

                <div className='bg-base-200 min-h-[90vh] w-80 mt-16 flex flex-col'>
                    {/* Header */}
                    <div className='bg-base-300 p-4 flex items-center gap-3 text-lg font-bold'>
                        {/* Nút đóng drawer bên trong */}
                        <label
                            htmlFor='group-drawer'
                            className='btn btn-circle btn-sm btn-ghost'
                        >
                            <SquareChevronRight size={20} />
                        </label>
                        <span>{selectedRoom?.name || 'Nhóm không tên'}</span>
                    </div>

                    {/* Nội dung chính */}
                    <div className='overflow-y-auto flex-1 p-2 space-y-2'>
                        {/* Thông tin nhóm */}
                        <div className='collapse collapse-arrow bg-base-100'>
                            <input type='checkbox' defaultChecked />
                            <div className='collapse-title text-xl font-medium flex items-center gap-2'>
                                <Users size={20} /> Thông tin nhóm
                            </div>
                            <div className='collapse-content'>
                                <p>
                                    <strong>Mô tả:</strong>{' '}
                                    {selectedRoom?.description ||
                                        'Không có mô tả'}
                                </p>
                                <p>
                                    <strong>Số thành viên:</strong>{' '}
                                    {participants.length}
                                </p>
                            </div>
                        </div>

                        {/* Thành viên nhóm */}
                        <div className='collapse collapse-arrow bg-base-100'>
                            <input type='checkbox' />
                            <div className='collapse-title text-xl font-medium flex items-center gap-2'>
                                <User size={20} /> Thành viên (
                                {participants.length})
                            </div>
                            <div className='collapse-content'>
                                <ul className='space-y-1'>
                                    {participants.map((user) => (
                                        <li
                                            key={user._id}
                                            className='flex items-center gap-2'
                                        >
                                            <span>{user.fullName}</span>
                                            {user._id === currentUser?._id && (
                                                <small className='badge badge-info'>
                                                    Bạn
                                                </small>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Tin nhắn ghim */}
                        {pinnedMessages.length > 0 && (
                            <div className='collapse collapse-arrow bg-base-100'>
                                <input type='checkbox' />
                                <div className='collapse-title text-xl font-medium flex items-center gap-2'>
                                    <Star size={20} /> Tin nhắn ghim
                                </div>
                                <div className='collapse-content'>
                                    <ul className='space-y-2'>
                                        {pinnedMessages.map((msg) => (
                                            <li
                                                key={msg._id}
                                                className='border-b pb-1'
                                            >
                                                <p>{msg.text}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Thư viện hình ảnh */}
                        <div className='space-y-4'>
                            <h3 className='font-semibold flex items-center gap-2'>
                                <LucidImage size={20} /> Thư viện ảnh
                            </h3>

                            <div className='grid grid-cols-3 gap-2'>
                                {mediaItems.map((item, index) => (
                                    <div key={index} className='relative group'>
                                        <img
                                            src={item.url}
                                            alt={`media-${index}`}
                                            className='w-full h-20 object-cover rounded cursor-pointer transition-transform hover:scale-105'
                                            onClick={() =>
                                                setPreviewUrl(item.url)
                                            }
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Hiển thị modal nếu có ảnh được chọn */}
                            {previewUrl && (
                                <ImagePreviewModal
                                    src={previewUrl}
                                    onClose={() => setPreviewUrl(null)}
                                />
                            )}
                        </div>

                        {/* Chủ đề */}
                        <div className='collapse collapse-arrow bg-base-100'>
                            <input type='checkbox' />
                            <div className='collapse-title text-xl font-medium flex items-center gap-2'>
                                <Wrench size={20} /> Tuỳ chỉnh đoạn chat
                            </div>
                            <div className='collapse-content p-2'>
                                <ul className='space-y-1'>
                                    <div className='p-2 rounded hover:bg-base-100 cursor-pointer transition-all duration-300 '>
                                        <div
                                            className='flex items-center gap-2'
                                            onClick={() =>
                                                setChangeTheme(!changeTheme)
                                            }
                                        >
                                            <Palette /> Theme Change
                                        </div>
                                        {changeTheme && (
                                            <ChangeTheme className='!pt-1 w-full' />
                                        )}
                                    </div>
                                    <div className='p-2 rounded hover:bg-base-100 cursor-pointer transition-all duration-300 '>
                                        <div
                                            onClick={() =>
                                                setPinnedMessagesOpen(
                                                    !pinnedMessagesOpen,
                                                )
                                            }
                                            className='flex items-center gap-2'
                                        >
                                            <Pin /> Pinned Messages
                                        </div>

                                        {pinnedMessagesOpen && (
                                            <div className='mt-2 bg-base-100 p-2 rounded shadow max-h-full overflow-y-auto'>
                                                {pinnedMessages.length === 0 ? (
                                                    <p className='text-sm text-gray-500 italic'>
                                                        Không có tin nhắn nào
                                                        được ghim.
                                                    </p>
                                                ) : (
                                                    <div className='space-y-2'>
                                                        {pinnedMessages.map(
                                                            (msg) => (
                                                                <div
                                                                    key={
                                                                        msg._id
                                                                    }
                                                                    className='relative flex p-2 bg-yellow-100 rounded-lg border-l-4 border-yellow-500 justify-between items-center'
                                                                >
                                                                    {/* Nội dung tin nhắn */}
                                                                    <div className='flex items-center gap-2 overflow-hidden flex-grow'>
                                                                        {msg.image && (
                                                                            <img
                                                                                src={
                                                                                    msg.image
                                                                                }
                                                                                alt='pinned'
                                                                                className='h-[40px] w-auto rounded shrink-0'
                                                                            />
                                                                        )}
                                                                        {msg.text && (
                                                                            <p className='text-sm text-gray-800 truncate max-w-[300px]'>
                                                                                {
                                                                                    msg.text
                                                                                }
                                                                            </p>
                                                                        )}
                                                                    </div>

                                                                    {/* Nút x */}
                                                                    <button
                                                                        onClick={() =>
                                                                            pinRoomMessage(
                                                                                msg._id,
                                                                                false,
                                                                            )
                                                                        }
                                                                        className='text-gray-500 hover:text-base-300 ml-4 self-center'
                                                                        title='Bỏ ghim'
                                                                    >
                                                                        ❌
                                                                    </button>
                                                                </div>
                                                            ),
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Nút rời nhóm */}
                    <div className='p-2 bg-base-300 text-right'>
                        <button
                            className='btn btn-error btn-outline btn-sm'
                            onClick={handleLeaveGroup}
                        >
                            <LogOut size={16} className='mr-1' /> Rời nhóm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
