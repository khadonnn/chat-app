import { Compass, House, Settings, User } from 'lucide-react';
import Dock from './ui/Dock';
import { Link } from 'react-router-dom';
const items = [
    {
        icon: (
            <Link to='/'>
                <House size={18} />
            </Link>
        ),
        label: 'Home',
    },
    {
        icon: (
            <Link to='/discover'>
                <Compass size={18} />
            </Link>
        ),
        label: 'Discover',
    },
    {
        icon: (
            <Link to='/profile'>
                <User size={18} />
            </Link>
        ),
        label: 'Profile',
    },
    {
        icon: (
            <Link to='/settings'>
                <Settings size={18} />
            </Link>
        ),
        label: 'Settings',
    },
];
const DockNavbar = () => {
    return (
        <Dock
            items={items}
            panelHeight={40}
            baseItemSize={40}
            magnification={60}
            className='rounded-lg !z-[9999]'
        />
    );
};
export default DockNavbar;
