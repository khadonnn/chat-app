import FlowingMenu from './ui/FlowingMenu.jsx';

const FlowingMenuReact = ({ link, text, image }) => {
    const demoItems = [
        {
            link: link,
            text: text,
            image: image,
        },
    ];

    return (
        <div style={{ height: '40px', position: 'relative' }}>
            <FlowingMenu items={demoItems} />
        </div>
    );
};
export default FlowingMenuReact;
