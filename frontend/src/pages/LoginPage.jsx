import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrambledText from '../components/ui/ScrambledText';
import LoginCard from '../components/LoginCard';
import SplitTextGsap from '../components/SplitText.jsx';
import { motion as Motion } from 'framer-motion';
const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className='min-h-screen grid lg:grid-cols-2 '>
            {/* left side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                <div className='w-full max-w-md space-y-8'>
                    {/* LOGO */}
                    <div className='text-center mb-8'>
                        <div className='flex flex-col items-center gap-2 group'>
                            <Motion.div
                                initial={{ y: 0 }}
                                animate={{ y: [0, -6, 0] }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
              group-hover:bg-primary/20 transition-colors'
                            >
                                <MessageSquare className='size-6 text-primary' />
                            </Motion.div>
                            <div className=''>
                                <SplitTextGsap mode='login' />
                            </div>
                            <ScrambledText
                                className='scrambled-text-demo !top-0 !m-0 tracking-normal'
                                radius={30}
                                duration={1.2}
                                speed={0.5}
                                scrambleChars='.:'
                            >
                                Login with <span>your account</span>
                            </ScrambledText>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>
                                    Email
                                </span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                                    <Mail className='h-5 w-5 text-base-content/40' />
                                </div>
                                <input
                                    type='email'
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='you@example.com'
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                            </div>
                        </div>

                        <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-medium'>
                                    Password
                                </span>
                            </label>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                                    <Lock className='h-5 w-5 text-base-content/40' />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder='••••••••'
                                    value={formData.password}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            password: e.target.value,
                                        })
                                    }
                                />
                                <button
                                    type='button'
                                    className='absolute inset-y-0 right-0 pr-3 flex items-center'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className='h-5 w-5 text-base-content/40' />
                                    ) : (
                                        <Eye className='h-5 w-5 text-base-content/40' />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type='submit'
                            className='btn btn-primary w-full'
                            disabled={isLoggingIn}
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className='h-5 w-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                'Sign in'
                            )}
                        </button>
                    </form>

                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Don&apos;t have an account?{' '}
                            <Link to='/signup' className='link link-primary'>
                                Create account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* right side */}
            <div className=' mr-10 items-center justify-center bg-base-200 flex rounded-xl h-[90%] overflow-hidden '>
                <LoginCard />
            </div>
        </div>
    );
};
export default SignUpPage;
