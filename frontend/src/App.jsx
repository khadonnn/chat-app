import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import SettingPage from './pages/SettingPage';
import ProfilePage from './pages/ProfilePage';
const App = () => {
    return (
        <div className=''>
            <Navbar />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/settings' element={<SettingPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
        </div>
    );
};
export default App;
