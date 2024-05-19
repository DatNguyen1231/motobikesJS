import Link from 'next/link';
import React, { useState, useContext } from 'react';
import { FaUserCircle, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import ContentProducts from '@/components/AdminProducts/Contents';
import AddProducts from '@/components/AdminProducts/AddProducts';
import { AuthContext } from '@/context/AuthContext';
import UpdateProducts from '@/components/AdminProducts/UpdateProducts';
import ProtectedRoute from '@/components/ProtectedRoute';
import ApproveOrders from '@/components/AdminProducts/ApproveOrders';

const AdminPage = () => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [activeContent, setActiveContent] = useState('default');
    const [userInfo, setUserInfo] = useState(null);
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [productToEdit, setProductToEdit] = useState(null);

    // Handle toggle options
    const handleToggleOptions = () => {
        setShowOptions(!showOptions);
        handleItemClick('products');
    };

    // Handle item click
    const handleItemClick = (item) => {
        setSelectedItem(item);
    };

    // Handle content change
    const handleContentChange = (content, e) => {
        e.stopPropagation();
        setActiveContent(content);
    };

    const changeContent = (content, product = null) => {
        setActiveContent(content);
        setProductToEdit(product);
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        setIsAuthenticated(false);
        setUserInfo(null);
    };

    return (
        <ProtectedRoute>
            <div className="min-h-screen flex flex-col">
                {/* Navbar */}
                <nav className="flex justify-between items-center bg-[#2B92E4] text-white p-4">
                    <Link href={'/'}>
                        <div className="mr-4 block cursor-pointer py-1.5 font-sans text-base font-medium leading-relaxed text-inherit antialiased">
                            Motorbike Ecommerce
                        </div>
                    </Link>
                    <div className="flex items-center">
                        <div className="mr-4">
                            <FaUserCircle className="text-3xl" />
                        </div>
                    </div>
                </nav>

                {/* Body */}
                <div className="flex flex-1 bg-[#EAEAEA]">
                    {/* Sidebar */}
                    <div className="w-60 bg-[#2B92E4]">
                        <ul className="text-white">

                             <li
                               
                                className="ml-4 text-lg font-semibold cursor-pointer"
                                onClick={(e) => handleContentChange('approveOrders', e)}
                            >
                                Duyệt đơn hàng
                            </li>

                            <li
                                className={`text-lg font-semibold cursor-pointer p-4 ${
                                    selectedItem === 'products' ? 'bg-[#9ECEE8]' : ''
                                }`}
                                onClick={handleToggleOptions}
                            >
                                <div className="flex items-center justify-between">
                                    Sản phẩm
                                    {showOptions ? <FaChevronDown /> : <FaChevronRight />}
                                </div>
                                {showOptions && (
                                    <ul className="ml-4 mt-2 text-base">
                                        <li
                                            className="mt-2 hover:text-gray-300"
                                            onClick={(e) => handleContentChange('products', e)}
                                        >
                                            Danh sách sản phẩm
                                        </li>
                                        <li
                                            className="mt-2 hover:text-gray-300"
                                            onClick={(e) => handleContentChange('addProduct', e)}
                                        >
                                            Thêm sản phẩm
                                        </li>
                                        <li onClick={(e) => handleContentChange('updateProduct', e)}></li>
                                    </ul>
                                )}
                            </li>
                            <li
                                onClick={() => {
                                    handleLogout();
                                }}
                                className="ml-4 text-lg font-semibold cursor-pointer"
                            >
                                Đăng xuất
                            </li>
                        </ul>
                    </div>

                     {/* Content */}
                    <div className="flex-1 p-4 overflow-auto">
                        {activeContent === 'products' ? (
                            <ContentProducts activeContent={activeContent} changeContent={changeContent} />
                        ) : activeContent === 'addProduct' ? (
                            <AddProducts activeContent={activeContent} />
                        ) : activeContent === 'updateProduct' ? (
                            <UpdateProducts
                                activeContent={activeContent}
                                product={productToEdit}
                                changeContent={changeContent}
                            />
                        ) : activeContent === 'approveOrders' ? (
                            // Hiển thị danh sách đơn hàng cần duyệt
                            <ApproveOrders activeContent={activeContent} changeContent={changeContent} />
                        )
                        : (
                            <div className="text-center text-lg">Đây là Admin Page</div>
                        )}
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default AdminPage;
