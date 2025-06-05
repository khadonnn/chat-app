import { lazy, Suspense } from 'react';
import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import Navbar from './components/Navbar';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Lazy load các trang
const HomePage = lazy(() => import('./pages/HomePage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SettingPage = lazy(() => import('./pages/SettingPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const DiscoverPage = lazy(() => import('./pages/DiscoverPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    if (isCheckingAuth && !authUser)
        return (
            <div className='flex items-center justify-center h-screen'>
                <Loader className='w-10 h-10 animate-spin' />
            </div>
        );
    // console.log(authUser);
    return (
        <div data-theme={theme}>
            <Navbar />
            <Suspense
                fallback={
                    <div className='flex items-center justify-center h-screen'>
                        <Loader className='w-10 h-10 animate-spin' />
                    </div>
                }
            >
                <Routes>
                    <Route
                        path='/'
                        element={
                            authUser ? <HomePage /> : <Navigate to='/login' />
                        }
                    />
                    <Route
                        path='/signup'
                        element={
                            !authUser ? <SignUpPage /> : <Navigate to='/' />
                        }
                    />
                    <Route
                        path='/login'
                        element={
                            !authUser ? <LoginPage /> : <Navigate to='/' />
                        }
                    />
                    <Route
                        path='/settings'
                        element={
                            authUser ? (
                                <SettingPage />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/profile'
                        element={
                            authUser ? (
                                <ProfilePage />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route
                        path='/discover'
                        element={
                            authUser ? (
                                <DiscoverPage />
                            ) : (
                                <Navigate to='/login' />
                            )
                        }
                    />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </Suspense>
            <Toaster />
        </div>
    );
};
export default App;
