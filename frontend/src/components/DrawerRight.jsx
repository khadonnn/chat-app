import { FileText, Image, Palette, Pin, SquareChevronLeft } from 'lucide-react';
import { useState } from 'react';
import ChangeTheme from './chat-function/ChangeTheme';
import { useChatStore } from '../store/useChatStore';
import MediaGallery from './chat-function/MediaGallery.jsx';

const DrawerRight = () => {
    const { pinnedMessages, pinMessage } = useChatStore();
    const [changeTheme, setChangeTheme] = useState();
    const [pinnedMessagesOpen, setPinnedMessagesOpen] = useState(false);
    const [imagesOpen, setImagesOpen] = useState(false);
    return (
        <div className='drawer drawer-end'>
            <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content'>
                <label
                    htmlFor='my-drawer-4'
                    className='drawer-button btn btn-xs !px-0 tooltip tooltip-left'
                    data-tip='open sidebar'
                >
                    <SquareChevronLeft />
                </label>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-4'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <ul className='menu bg-base-200 text-base-content min-h-[90vh] w-80  mt-16'>
                    {/* Collapse image and file */}
                    <li className='hover:bg-base-300 rounded-lg transition-all duration-300'>
                        <details className='collapse collapse-arrow'>
                            <summary className='collapse-title text-lg font-medium'>
                                Ảnh và File phương tiện
                            </summary>
                            <div className='collapse-content'>
                                <ul className='space-y-1'>
                                    <div
                                        className='p-2 rounded hover:bg-base-100 cursor-pointer flex gap-2 items-center'
                                        onClick={() =>
                                            setImagesOpen(!imagesOpen)
                                        }
                                    >
                                        <div className='flex items-center gap-2'>
                                            <Image /> Image
                                        </div>
                                    </div>
                                    {imagesOpen && <MediaGallery />}
                                    <div className='p-2 rounded hover:bg-base-100 cursor-pointer flex gap-2 items-center'>
                                        <FileText /> File
                                    </div>
                                </ul>
                            </div>
                        </details>
                    </li>

                    {/* Collapse theme va pin messages */}
                    <li className='hover:bg-base-300 rounded-lg transition-all duration-300'>
                        <details
                            tabIndex={0}
                            className='collapse collapse-arrow'
                        >
                            <summary className='collapse-title text-lg font-medium'>
                                Tuỳ chỉnh đoạn chat
                            </summary>
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
                                                                    {/* Nội dung tin nhắn - nên chiếm phần chính */}
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

                                                                    {/* Nút x luôn nằm cuối */}
                                                                    <button
                                                                        onClick={() =>
                                                                            pinMessage(
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
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DrawerRight;
