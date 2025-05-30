import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';
import DockNavbar from './DockNavbar';

const Navbar = () => {
    const { logout, authUser } = useAuthStore();

    return (
        <>
            <header
                className='bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
        backdrop-blur-lg bg-base-100/80'
            >
                <div className='container mx-auto px-4 h-16 '>
                    <div className='flex items-center justify-between h-full'>
                        <div className='flex items-center gap-8'>
                            <Link
                                to='/'
                                className='flex items-center gap-2.5 hover:opacity-80 transition-all'
                            >
                                <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                                    <MessageSquare className='w-5 h-5 text-primary' />
                                </div>
                                <h1 className='text-lg font-bold'>Chatty</h1>
                            </Link>
                        </div>

                        <div className='flex items-center gap-2'>
                            {authUser && (
                                <>
                                    <div className='dropdown dropdown-center'>
                                        <div
                                            tabIndex={0}
                                            role='button'
                                            className='btn btn-soft btn-circle avatar'
                                        >
                                            <div className='w-10 rounded-full'>
                                                <img
                                                    alt='Tailwind CSS Navbar component'
                                                    src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                                />
                                            </div>
                                        </div>
                                        <ul
                                            tabIndex={0}
                                            className='menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-4 w-52 p-2 shadow-md ring-1 ring-white/10 '
                                        >
                                            <li>
                                                <Link to={'/profile'}>
                                                    <User className='size-5' />
                                                    <span className='hidden sm:inline'>
                                                        Profile
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={'/settings'}>
                                                    <Settings className='w-4 h-4' />
                                                    <span className='hidden sm:inline'>
                                                        Settings
                                                    </span>
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    className='flex gap-2 items-center text-red-500'
                                                    onClick={logout}
                                                >
                                                    <LogOut className='size-5' />
                                                    <span className='hidden sm:inline '>
                                                        Logout
                                                    </span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            {authUser && (
                <div className=' hidden md:flex fixed bottom-1 left-1/2 -translate-x-1/2 justify-center items-center'>
                    <DockNavbar />
                </div>
            )}
        </>
    );
};
export default Navbar;
