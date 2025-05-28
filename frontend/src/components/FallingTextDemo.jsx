import FallingText from './ui/FallingText.jsx';

const FallingTextDemo = () => {
    return (
        <FallingText
            text={`Chit-Chat is a modern, lightweight chat app that enables seamless real-time messaging, chat room creation, and effortless connection with others through a clean, intuitive interface`}
            highlightWords={[
                'Chit-Chat',
                'real-time',
                'connection',
                'room',
                'simplify',
            ]}
            highlightClass='highlighted'
            trigger='hover'
            backgroundColor='transparent'
            wireframes={false}
            gravity={0.56}
            fontSize='2rem'
            mouseConstraintStiffness={0.9}
        />
    );
};
export default FallingTextDemo;
