import React, { useState } from 'react';
import axiosInstance from '@/pages/api/axios';
import { InputProfileField } from '@/components/constants/Input';
import { changePassword } from '@/pages/api/api';

const ChangePasswordForm = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);

    const [passwords, setPasswords] = useState({
        oldPassword: '',
        newPassword: '',
        enterPassword: '',
    });
    const [errors, setErrors] = useState({
        oldPassword: '',
        newPassword: '',
        enterPassword: '',
    });
    const [message, setMessage] = useState('');

    const handleChange = (fieldName, value) => {
        setPasswords((prev) => ({
            ...prev,
            [fieldName]: value,
        }));
        // Reset errors when user changes input
        setErrors((prev) => ({
            ...prev,
            [fieldName]: '',
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Define a new local object for errors
        const newErrors = {
            oldPassword: '',
            newPassword: '',
            enterPassword: '',
        };

        if (passwords.newPassword !== passwords.enterPassword) {
            newErrors.newPassword = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
            newErrors.enterPassword = 'Mật khẩu mới và xác nhận mật khẩu không khớp.';
            setErrors(newErrors);
            return;
        }

        try {
            const data = {
                oldPassword: passwords.oldPassword,
                newPassword: passwords.newPassword,
                enterPassword: passwords.enterPassword,
            };
            const response = await changePassword(data);

            if (response.success) {
                setMessage('Đổi mật khẩu thành công!');
                setPasswords({ oldPassword: '', newPassword: '', enterPassword: '' });
                setIsFormVisible(false); // Tắt form khi đổi mật khẩu thành công
            } else {
                setMessage(response.messenger || 'Đổi mật khẩu không thành công!');
                setErrors({
                    ...newErrors,
                    ...response.errors,
                });
            }
        } catch (error) {
            setMessage(error.messenger || 'Có lỗi xảy ra, vui lòng thử lại sau.');
            setErrors({ ...newErrors, serverError: error.messenger || 'Có lỗi xảy ra' });
        }
    };

    return (
        <div>
            <h2>Đổi Mật Khẩu</h2>
            {isFormVisible ? (
                <form onSubmit={handleSubmit}>
                    <InputProfileField
                        label="Mật khẩu cũ:"
                        type="password"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={(e) => handleChange('oldPassword', e.target.value)}
                        error={errors.oldPassword}
                        isEditable={true}
                        showEditButton={false}
                        required
                    />
                    {errors.oldPassword && <p className="text-red-500">{errors.oldPassword}</p>}

                    <InputProfileField
                        label="Mật khẩu mới:"
                        type="password"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={(e) => handleChange('newPassword', e.target.value)}
                        error={errors.newPassword}
                        isEditable={true}
                        showEditButton={false}
                    />
                    {/* Render error message if error exists */}
                    {errors.newPassword && <p className="text-red-500">{errors.newPassword}</p>}

                    <InputProfileField
                        label="Xác nhận mật khẩu mới:"
                        type="password"
                        name="enterPassword"
                        value={passwords.enterPassword}
                        onChange={(e) => handleChange('enterPassword', e.target.value)}
                        error={errors.enterPassword}
                        isEditable={true}
                        showEditButton={false}
                        required
                    />
                    {/* Render error message if error exists */}
                    {errors.enterPassword && (
                        <div className="py-3 mt-2 text-right space-x-4">
                            <p className="inline-flex justify-center rounded-md border border-transparent bg-[#D9D9D9] py-2 px-4 text-sm font-medium text-black shadow-sm hover:bg-[#cebfbf] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                {errors.enterPassword}
                            </p>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3"
                    >
                        Đổi mật khẩu
                    </button>
                </form>
            ) : (
                <p>{message}</p>
            )}
        </div>
    );
};

export default ChangePasswordForm;
