import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { InputProfileField } from '@/components/constants/Input';
import { updateUserAccount, getUserInfo } from '@/pages/api/api';
import ChangePasswordForm from '@/components/ChangePassword';

const Profile = () => {
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);

    const [userData, setUserData] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        address: '',
        password: '',
    });

    const [editStates, setEditStates] = useState({
        fullName: false,
        phoneNumber: false,
        email: false,
        address: false,
        password: false,
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const response = await getUserInfo();
            if (response.success) {
                setUserData(response.data);
            } else {
                console.error(response.message);
            }
        };

        fetchUserInfo();
    }, []);

    const handleEditClick = (field) => {
        setEditStates((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleChange = (field, value) => {
        setUserData((prev) => ({ ...prev, [field]: value }));
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        const response = await updateUserAccount(userData);
        if (response.success) {
            // Alert user of successful update
            alert('Cập nhật thông tin thành công!');

            setEditStates({
                fullName: false,
                phoneNumber: false,
                email: false,
                address: false,
                password: false,
            });
        } else {
            alert('Có lỗi xảy ra khi cập nhật thông tin!');
        }
    };

    const toggleChangePasswordForm = () => {
        setShowChangePasswordForm((prev) => !prev);
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-5 mx-auto flex flex-col">
                <div className="rounded-lg lg:h-full">
                    <div className="sm:mt-0">
                        {/* BÌA */}
                        <div className="relative rounded-lg lg:h-[25rem] overflow-hidden">
                            <img
                                alt="content"
                                className="object-cover object-center h-full w-full"
                                src="/assets/images/banner-3.jpg"
                            />
                            <input id="coverimage" type="file" className="hidden" />
                        </div>
                        {/* Cover */}
                        <div className="py-4 md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                {/* AVATAR */}
                                <div className="container px-5 py-5 mx-auto">
                                    <div className="flex flex-col items-center">
                                        {/* AVATAR */}
                                        <div className="w-32 h-32 flex justify-center items-center bg-gray-100 rounded-full dark:bg-gray-600">
                                            <FaUserCircle size={100} />
                                        </div>

                                        {/* Name and Status */}
                                        <div className="text-center mt-4">
                                            {' '}
                                            {/* Adjust margin-top as needed */}
                                            {/* Name */}
                                            <div className="text-gray-800 font-bold text-[2rem]">
                                                {userData.fullName || 'User Name'}
                                            </div>
                                            {/* Status */}
                                            <p className="leading-relaxed mb-5">Motorbike Ecommerce</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* FORM */}
                            <div className="mt-5 md:col-span-2 md:mt-0">
                                <form id="updateUser" onSubmit={(e) => handleUpdateUser(e)}>
                                    <div className="overflow-hidden shadow sm:rounded-md">
                                        <div className="bg-white px-4 py-5 sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <InputProfileField
                                                    id="fullName"
                                                    label="Họ và Tên"
                                                    value={userData?.fullName}
                                                    isEditable={editStates.fullName}
                                                    onChange={(e) => handleChange('fullName', e.target.value)}
                                                    toggleEdit={() => handleEditClick('fullName')}
                                                />
                                                <InputProfileField
                                                    id="phoneNumber"
                                                    label="Số điện thoại"
                                                    value={userData?.phoneNumber}
                                                    isEditable={editStates.phoneNumber}
                                                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                                    toggleEdit={() => handleEditClick('phoneNumber')}
                                                />
                                                <InputProfileField
                                                    id="email"
                                                    label="Email"
                                                    value={userData?.email}
                                                    isEditable={editStates.email}
                                                    onChange={(e) => handleChange('email', e.target.value)}
                                                    toggleEdit={() => handleEditClick('email')}
                                                />
                                                <InputProfileField
                                                    id="address"
                                                    label="Địa chỉ"
                                                    value={userData?.address}
                                                    isEditable={editStates.address}
                                                    onChange={(e) => handleChange('address', e.target.value)}
                                                    toggleEdit={() => handleEditClick('address')}
                                                />
                                            </div>

                                            {/* BUTTON */}
                                            <div className="py-3 mt-2 text-right space-x-4">
                                                <button
                                                    type="button"
                                                    onClick={toggleChangePasswordForm}
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#D9D9D9] py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-[#cebfbf] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Đổi mật khẩu
                                                </button>

                                                <button
                                                    type="submit"
                                                    form="updateUser"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-[#2B92E4] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#37709e] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                >
                                                    Lưu
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {showChangePasswordForm && <ChangePasswordForm />}
            </div>
        </section>
    );
};

export default Profile;
