export const GroupInfo = ({ room, participants }) => {
    return (
        <div className='p-3 bg-blue-50 border-b'>
            <p>
                <strong>Số thành viên:</strong> {participants.length}
            </p>
            <p>
                <strong>Mô tả:</strong> {room.description || 'Không có mô tả'}
            </p>
        </div>
    );
};
