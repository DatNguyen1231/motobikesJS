import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa';
import { AuthContext } from '@/context/AuthContext';
import { useContext, useEffect, useState, useRef } from 'react';
import { FaCaretDown, FaCaretRight, FaSearch } from 'react-icons/fa';
import SearchBar from '../SearchBar';
import { useRouter } from 'next/router';

export default function Nav({ setShowLoginModal, setShowRegisterModal }) {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const [userInfo, setUserInfo] = useState(null);

    const router = useRouter();
    const { typePage } = router.query;

    // Close dropdown when click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    // Check if token exists in localStorage when component mounts
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        const token = localStorage.getItem('token');
        if ((token, storedUserInfo)) {
            setIsAuthenticated(true);
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, [setIsAuthenticated]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (

        <>
            <div className="grid w-full place-items-center rounded-lg p-6 pb-7 lg:overflow-visible">
                <div className="-m-7 max-h-[768px] w-[calc(100%+48px)]">
                    <nav className="sticky top-0 z-10 block w-full max-w-full px-4 py-3 text-white bg-[#2B92E4] rounded-none shadow-md h-max border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200 lg:px-8 lg:py-4">
                        <div className="flex items-center justify-between text-blue-gray-900">
                            <Link
                                href={'/'}
                                className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased"
                            >
                                Motorbike Ecommerce
                            </Link>

                            {/* Search bar */}
                            <SearchBar />

                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-x-5">
                                    {/* Motorcycle */}
                                    <Link href={'/ProductPage?typePage=1'}>
                                        <button
                                            className="hidden px-4 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                            type="button"
                                            style={{ backgroundColor: `${typePage == 1 ? '#4885bd' : ''}` }}
                                        >
                                            <span>Xe máy</span>
                                        </button>
                                    </Link>
                                    {/* Accessary */}
                                    <Link href={'/ProductPage?typePage=2'}>
                                        <button
                                            className="hidden px-4 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                            type="button"
                                            style={{ backgroundColor: `${typePage == 2 ? '#4885bd' : ''}` }}
                                        >
                                            <span>Phụ tùng</span>
                                        </button>
                                    </Link>
                                    {/* Login */}
                                    {isAuthenticated ? (
                                        <div ref={dropdownRef} className="relative flex items-center">
                                            <FaUserCircle
                                                className="cursor-pointer text-4xl text-[#FFFFFF]"
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            />
                                            <span
                                                className="ml-2 font-bold text-white cursor-pointer"
                                                onClick={() => setShowDropdown(!showDropdown)}
                                            >
                                                {userInfo?.fullName}
                                            </span>
                                            {showDropdown ? (
                                                <FaCaretDown
                                                    className="ml-2 text-xl text-white cursor-pointer"
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                />
                                            ) : (
                                                <FaCaretRight
                                                    className="ml-2 text-xl text-white cursor-pointer"
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                />
                                            )}

                                            {showDropdown && (
                                                <div className="absolute right-0 mt-72 w-48 py-5 bg-white shadow-xl rounded-md overflow-hidden">
                                                    <div className="flex flex-col justify-center items-center p-2">
                                                        <FaUserCircle className="text-4xl text-[#949393]" />
                                                        <h3 className="font-bold text-xl text-black mt-3">
                                                            <span>{userInfo?.username}</span>
                                                        </h3>
                                                    </div>
                                                    <div className="flex justify-center">
                                                        <hr className="w-3/4 border-gray-300" />
                                                    </div>
                                                    <ul className="text-gray-700">
                                                        <Link href={'/ProfilePage'}>
                                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                Xem hồ sơ
                                                            </li>
                                                        </Link>

                                                        <Link href={'/OrderHistory'}>
                                                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                Đơn hàng đã mua
                                                            </li>
                                                        </Link>
                                                        {/* Admin Button */}
                                                        {userInfo?.role === 'ADMIN' && (
                                                            <Link href={'/AdminPage'}>
                                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                                                    Đến trang admin
                                                                </li>
                                                            </Link>
                                                        )}
                                                        <li
                                                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                                                            onClick={() => {
                                                                handleLogout();
                                                                setShowDropdown(false); /* handleLogout */
                                                            }}
                                                        >
                                                            Đăng xuất
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        // Render your regular buttons for login and register
                                        <>
                                            <button
                                                className="hidden px-4 py-3 font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                                onClick={() => setShowLoginModal(true)}
                                            >
                                                Đăng nhập
                                            </button>
                                            <button
                                                className="hidden px-4 py-3 font-sans text-xs font-bold text-center text-white bg-black uppercase align-middle transition-all rounded-lg select-none hover:bg-black/30 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block"
                                                onClick={() => setShowRegisterModal(true)}
                                            >
                                                Đăng ký
                                            </button>
                                        </>
                                    )}
                                    {/* Cart */}
                                    <Link href={'/CartPage'}>
                                        <div className="hidden px-5 py-3 cursor-pointer font-sans text-xs font-bold text-center text-white uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:inline-block">
                                            <FaShoppingCart className="text-2xl" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}
