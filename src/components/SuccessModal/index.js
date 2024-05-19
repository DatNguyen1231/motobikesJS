import React from 'react';

const SuccessModal = ({ setShowSuccessModal, title, message, onClose }) => {
    return (
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
                <h2 className="text-2xl font-bold text-black mb-2">{title}</h2>
                <p className="text-gray-500">{message}</p>
                <button
                    onClick={() => {
                        setShowSuccessModal(false);
                        if (onClose) onClose();
                    }}
                    className="border-2 bg-[#2B92E4] rounded-full px-6 py-2 mt-4 font-semibold hover:bg-[#12419b] hover:text-white"
                >
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
