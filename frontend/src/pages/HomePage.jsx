import ChatContainer from '../components/ChatContainer';
import DrawerRight from '../components/DrawerRight';
import RoomChatContainer from '../components/group-chat/GroupChatContainer';
import NoChatSelected from '../components/NoChatSelected';
import Sidebar from '../components/Sidebar';
import { useChatStore } from '../store/useChatStore';
import { useRoomStore } from '../store/useRoomStore';
const HomePage = () => {
    const { selectedUser } = useChatStore();
    const { selectedRoom } = useRoomStore();

    let Content = <NoChatSelected />;

    if (selectedUser) {
        Content = <ChatContainer />;
    } else if (selectedRoom) {
        Content = <RoomChatContainer />;
    }

    return (
        <div className='h-screen bg-base-200'>
            <div className='flex justify-center items-center pt-20 px-4 '>
                <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-6xl h-[calc(100vh-8rem)] relative'>
                    <div className='flex h-full rounded-lg overflow-hidden'>
                        <Sidebar />
                        {Content}
                    </div>
                    <div className='absolute top-5 right-14'>
                        {selectedUser && <DrawerRight />}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default HomePage;
