// src/components/video-call/VideoCallPopup.tsx

import { useCallStore } from '../../store/useVideoCallStore';

const VideoCallPopup = () => {
    const {
        isVisible,
        isCaller,
        callerName,
        calleeName,
        closeCallPopup,
        onAccept,
        onReject,
        callerImage,
        calleeImage,
    } = useCallStore();

    if (!isVisible) return null;

    const handleAccept = () => {
        if (onAccept) onAccept();
        closeCallPopup();
    };

    const handleReject = () => {
        if (onReject) onReject();
        closeCallPopup();
    };

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg text-center w-[300px] flex flex-col items-center justify-center'>
                <img
                    src={isCaller ? calleeImage : callerImage}
                    alt='Avatar'
                    className='w-20 h-20 rounded-full mb-4'
                />
                <h2 className='text-xl font-semibold mb-4'>
                    {isCaller
                        ? `Đang gọi đến ${calleeName}...`
                        : `${callerName} đang gọi cho bạn...`}
                </h2>
                <div className='flex justify-center gap-4 mt-4'>
                    {!isCaller && (
                        <button
                            onClick={handleAccept}
                            className='bg-green-500 text-white px-4 py-2 rounded'
                        >
                            Chấp nhận
                        </button>
                    )}
                    <button
                        onClick={handleReject}
                        className='bg-red-500 text-white px-4 py-2 rounded'
                    >
                        Từ chối
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VideoCallPopup;
