import React, { useState, useEffect, useContext } from 'react';
import { auth_login } from '@/pages/api/api';
import { MdLockOutline } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';
import { IoCloseCircleSharp } from 'react-icons/io5';
import { AuthContext } from '@/context/AuthContext';
import { InputLoginField } from '../constants/Input';
import Link from 'next/link';

const LoginModal = ({ setShowModal, setShowRegisterModal }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [error, setError] = useState({ username: '', password: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const handleClose = (e) => {
        if (e.target.id === 'modal-wrapper') {
            setShowModal(false);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError({ username: '', password: '' });

        if (!username && !password) {
            setError({ username: 'Vui lòng nhập tên đăng nhập', password: 'Vui lòng nhập mật khẩu' });
            return;
        }

        setIsLoading(true);
        const result = await auth_login(username, password);
        setIsLoading(false);

        if (result && result.messenger) {
            if (result.messenger.includes('tên đăng nhập')) {
                setError((currentErrors) => ({ ...currentErrors, username: result.messenger }));
            }
            if (result.messenger.includes('mật khẩu')) {
                setError((currentErrors) => ({ ...currentErrors, password: result.messenger }));
            } else {
                setError((currentErrors) => ({ ...currentErrors, password: result.messenger }));
            }
        }

        if (result.success) {
            if (rememberMe) {
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
            }
            setIsAuthenticated(true);
            setShowSuccessModal(true);
            setTimeout(() => {
                setShowSuccessModal(false);
                setShowModal(false);
                window.location.reload();
            }, 3000);
        }
    };

    useEffect(() => {
        const savedUsername = localStorage.getItem('username');
        const savedPassword = localStorage.getItem('password');
        if (savedUsername && savedPassword) {
            setUsername(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    return (
        <div
            id="modal-wrapper"
            onClick={handleClose}
            className="z-10 fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
            <div id="modal-content" className="flex flex-col rounded-2xl items-center text-center">
                <form onSubmit={handleLogin}>
                    <div className="bg-white rounded-2xl shadow-2xl flex w-[850px]">
                        <div className="w-3/4 p-5">
                            <div className="text-left font-bold">
                                <span className="text-[#4B5563]">Motorbike</span> Ecommerce
                            </div>
                            <div className="py-10">
                                <h2 className="text-3xl font-bold text-black mb-2">Đăng nhập</h2>
                                <div className="border-2 w-10 border-black inline-block mb-2"></div>
                                <p className="text-gray-400 my-3">Đăng nhập vào tài khoản của bạn</p>
                                <div className="flex flex-col items-center">
                                    <InputLoginField
                                        Icon={FaUser}
                                        type="text"
                                        placeholder="Tên đăng nhập"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        error={error.username}
                                    />
                                    {error.username && (
                                        <p className="w-[80%] text-red-500 text-xs mb-3 text-left">{error.username}</p>
                                    )}
                                    <InputLoginField
                                        Icon={MdLockOutline}
                                        type="password"
                                        placeholder="Mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        error={error.password}
                                    />
                                    {error.password && (
                                        <p className="w-[80%] text-red-500 text-xs mb-5 text-left">{error.password}</p>
                                    )}
                                    <div className="flex justify-between w-[80%] mb-5">
                                        <label className="flex items-center text-xs">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={() => setRememberMe(!rememberMe)}
                                                className="mr-1"
                                            />
                                            Nhớ mật khẩu
                                        </label>
                                        <Link href="/ForgotPassword?" onClick={() => setShowModal(false)}>
                                            <span className="italic text-xs text-gray-600">Quên mật khẩu ?</span>
                                        </Link>
                                    </div>
                                    <button
                                        type="submit"
                                        // onSubmit={handleKeyPress(handleLogin)}
                                        onClick={handleLogin}
                                        className="border-2 border-black text-black rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#2B92E4] hover:text-white disabled:bg-[#2B92E4] disabled:text-gray-200"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="w-2/4 py-36 px-12 bg-[#2B92E4] text-white rounded-tr-2xl rounded-br-2xl relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-0 right-0 mt-2 mr-3 text-black text-xl"
                            >
                                <IoCloseCircleSharp />
                            </button>
                            <h2 className="font-bold text-3xl mb-2">Đăng ký</h2>
                            <div className="border-2 w-10 border-white inline-block mb-2"></div>
                            <p className="mb-10">Bạn chưa có tài khoản ?</p>
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setShowRegisterModal(true);
                                }}
                                className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#2B92E4]"
                            >
                                Đăng ký
                            </button>
                        </div>
                    </div>

                    {/* Success Modal */}
                    {showSuccessModal && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                                <div className="relative">
                                    <svg className="w-20 h-20 text-green-500" fill="none" viewBox="0 0 24 24">
                                        <circle
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="animate-draw-circle"
                                            style={{ strokeDasharray: '314, 314' }}
                                        />
                                        <path
                                            className="stroke-current text-green-500 animate-draw-tick"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 12l4 4L18 8"
                                            style={{ strokeDasharray: '26, 26' }}
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-black mb-2">Đăng nhập thành công!</h2>
                                <p className="text-gray-500">Chào mừng bạn đến với Motobike Ecommerce.</p>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
