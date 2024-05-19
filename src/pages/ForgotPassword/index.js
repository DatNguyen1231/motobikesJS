import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaKey } from 'react-icons/fa'; // Import thêm FaKey cho biểu tượng mã xác nhận
import { InputLoginField } from '@/components/constants/Input';
import { ForgotPassword, ConfirmOTP } from '@/pages/api/api';
import { IoArrowBackCircle } from 'react-icons/io5';
import { CiCircleCheck } from 'react-icons/ci';

export default function ForgotPasswordForm() {
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [showConfirmationForm, setShowConfirmationForm] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [counter, setCounter] = useState(0);

    // Handle email change
    const handleEmailChange = (e) => setEmail(e.target.value);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setError('');
        try {
            const isSuccess = await ForgotPassword(email);
            if (isSuccess) {
                setShowConfirmationForm(true);
            }
        } catch (error) {
            setError(error.message);
        }
        setIsSending(false);
    };

    // Handle code change
    const handleCodeChange = (e) => setCode(e.target.value);

    const handleSubmitCode = async (e) => {
        e.preventDefault();
        setError('');
        setIsConfirming(true);
        try {
            await ConfirmOTP(email, code);
            setIsSuccess(true);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsConfirming(false);
        }
    };

    // Resend OTP
    const resendOTP = async () => {
        setIsSending(true);
        try {
            await ForgotPassword(email);
            setCounter(30);
        } catch (error) {
            setError('Có lỗi xảy ra khi gửi lại mã.');
        }
        setIsSending(false);
    };

    // Count down timer
    useEffect(() => {
        let intervalId;
        if (counter > 0) {
            intervalId = setInterval(() => {
                setCounter((prevCounter) => prevCounter - 1);
            }, 1000);
        }
        return () => clearInterval(intervalId);
    }, [counter]);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-40">
            <div className="px-8 py-6 md:px-12 md:py-10 text-left bg-white shadow-lg max-w-lg w-full">
                {isSuccess ? (
                    // Display success screen
                    <div className="text-center">
                        <CiCircleCheck className="mx-auto text-green-500 text-9xl" />
                        <p className="mt-4 p-2 text-lg font-bold">Mật khẩu đã được thay đổi</p>
                        <p className="p-2">Vui lòng vào email để nhận mật khẩu mới</p>
                        <button
                            onClick={() => (window.location.href = '/')}
                            className="mt-4 px-20 py-3 leading-5 text-lg text-white transition-colors duration-200 transform bg-[#0F3187] rounded-full hover:bg-blue-700 focus:outline-none"
                        >
                            Đăng nhập
                        </button>
                    </div>
                ) : !showConfirmationForm ? (
                    // Email form
                    <>
                        <h3 className="text-2xl font-bold text-center p-2">Quên mật khẩu</h3>
                        <p className="mt-4 p-2 text-center">Vui lòng nhập email để lấy lại mật khẩu</p>
                        <form onSubmit={handleEmailSubmit}>
                            <div className="text-2xl">
                                <div className="mt-4 flex flex-col justify-center items-center">
                                    <InputLoginField
                                        Icon={FaEnvelope}
                                        type="email"
                                        placeholder="Nhập email"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                    {error && <p className="w-[80%] text-red-500 text-sm mb-3 text-left">{error}</p>}
                                </div>
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        type="submit"
                                        className="px-20 py-3 leading-5 text-lg text-white transition-colors duration-200 transform bg-[#0F3187] rounded-full hover:bg-blue-700 focus:outline-none"
                                        disabled={isSending} // Thêm disabled khi đang gửi email
                                    >
                                        Lấy lại mật khẩu
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    // OTP form
                    <>
                        {/* Nút quay lại */}
                        <div className="text-left mb-4">
                            <button
                                onClick={() => setShowConfirmationForm(false)} // Cập nhật lại state để hiển thị form nhập email
                                className="text-2xl hover:text-blue-700 font-semibold"
                            >
                                <IoArrowBackCircle />
                            </button>
                        </div>
                        <h3 className="text-2xl font-bold text-center p-2">Nhập mã xác nhận</h3>
                        <p className="mt-4 p-2 text-center">
                            Hệ thống đã gửi mã xác nhận đến địa chỉ email của bạn, vui lòng kiểm tra email
                        </p>
                        <form onSubmit={handleSubmitCode}>
                            <div className="text-2xl">
                                <div className="mt-4 flex flex-col justify-center items-center">
                                    <InputLoginField
                                        Icon={FaEnvelope}
                                        type="text"
                                        placeholder="Nhập mã xác nhận"
                                        value={code}
                                        onChange={handleCodeChange}
                                    />
                                    {error && <p className="w-[80%] text-red-500 text-sm mb-3 text-left">{error}</p>}
                                </div>
                                <div className="flex items-center justify-center mt-6">
                                    <button
                                        type="submit"
                                        className="px-32 py-3 leading-5 text-lg text-white transition-colors duration-200 transform bg-[#0F3187] rounded-full hover:bg-blue-700 focus:outline-none"
                                        disabled={isConfirming}
                                    >
                                        {isConfirming ? 'Đang xác nhận...' : 'Xác nhận'}
                                    </button>
                                </div>
                                <div>
                                    <p className="text-center mt-6 text-base">
                                        {counter > 0 ? (
                                            <span> Gửi lại mã ({counter}s) </span>
                                        ) : (
                                            <a href="#" onClick={resendOTP} className="text-[#0F3187] hover:underline">
                                                Gửi lại mã
                                            </a>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
