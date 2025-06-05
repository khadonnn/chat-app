import { lazy, Suspense } from 'react';
import { Loader } from 'lucide-react';

const Lanyard = lazy(() => import('./ui/Lanyard.jsx'));

const LoginCard = () => {
    return (
        <Suspense
            fallback={
                <div className='flex justify-center items-center h-64'>
                    <Loader className='w-6 h-6 animate-spin' />
                </div>
            }
        >
            <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
        </Suspense>
    );
};

export default LoginCard;
