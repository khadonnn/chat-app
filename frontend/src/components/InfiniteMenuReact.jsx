import InfiniteMenu from './ui/InfiniteMenu.jsx';
const items = [
    {
        image: 'https://picsum.photos/seed/1/300/300',
        link: 'https://google.com/',
        title: 'Friend 1',
        description: 'This is pretty cool, right?',
    },
    {
        image: 'https://picsum.photos/seed/2/400/400',
        link: 'https://google.com/',
        title: 'Friend 2',
        description: 'This chat is fantastic!',
    },
    {
        image: 'https://picsum.photos/seed/3/500/500',
        link: 'https://google.com/',
        title: 'Friend 3',
        description: 'More friends, more fun!',
    },
    {
        image: 'https://picsum.photos/seed/4/600/600',
        link: 'https://google.com/',
        title: 'Friend 4',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/5/600/600',
        link: 'https://google.com/',
        title: 'Friend 5',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/6/600/600',
        link: 'https://google.com/',
        title: 'Friend 6',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/7/600/600',
        link: 'https://google.com/',
        title: 'Friend 7',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/8/600/600',
        link: 'https://google.com/',
        title: 'Friend 8',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/9/600/600',
        link: 'https://google.com/',
        title: 'Friend 9',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/10/600/600',
        link: 'https://google.com/',
        title: 'Friend 10',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/11/600/600',
        link: 'https://google.com/',
        title: 'Friend 11',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/12/600/600',
        link: 'https://google.com/',
        title: 'Friend 12',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/13/600/600',
        link: 'https://google.com/',
        title: 'Friend 13',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/14/600/600',
        link: 'https://google.com/',
        title: 'Friend 14',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/15/600/600',
        link: 'https://google.com/',
        title: 'Friend 15',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/16/600/600',
        link: 'https://google.com/',
        title: 'Friend 16',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/17/600/600',
        link: 'https://google.com/',
        title: 'Friend 17',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/18/600/600',
        link: 'https://google.com/',
        title: 'Friend 18',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/19/600/600',
        link: 'https://google.com/',
        title: 'Friend 19',
        description: 'Connect with me!',
    },
    {
        image: 'https://picsum.photos/seed/20/600/600',
        link: 'https://google.com/',
        title: 'Friend 20',
        description: 'Connect with me!',
    },
];
const InfiniteMenuReact = () => {
    return (
        <div
            style={{
                height: '500px',
                position: 'relative',
                color: 'white',
            }}
        >
            <InfiniteMenu items={items} />
        </div>
    );
};
export default InfiniteMenuReact;
