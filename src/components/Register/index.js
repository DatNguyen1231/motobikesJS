import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLockOutline, MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { ImLocation } from 'react-icons/im';
import { useForm, watch } from 'react-hook-form';
import InputComponent from '../constants/Input';
import { setRegisterData } from '@/pages/api/api';
import { IoCloseCircleSharp } from 'react-icons/io5';

const RegisterModal = ({ setShowModal, setShowLoginModal }) => {
    const [severErorEmail, setSeverErorEmail] = useState(false);
    const [severErorPhone, setSeverErorPhone] = useState(false);
    const [severErorUser, setSeverErorUser] = useState(false);
    const [passwordsMatch, setPasswordsMatch] = useState(false);

    // Close Modal Event
    const handleClose = (e) => {
        if (e.target.id === 'modal-wrapper') {
            setShowModal(false);
        }
    };

    const handleReset = (e) => {
        setSeverErorEmail(false);
        setSeverErorPhone(false);
        setSeverErorUser(false);
        setPasswordsMatch(false);
    };

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const dataSubmit = async (data) => {
        if (data.password === data.ConfirmPassword) {
            delete data.ConfirmPassword;
            setPasswordsMatch(false);
            try {
                // Giả sử setRegisterData trả về một Promise
                setRegisterData(data)
                    .then((response) => {
                        if (response.messenger == 'Số điện thoại đã tồn tại') {
                            setSeverErorPhone(true);
                        } else if (response.messenger == 'Email đã tồn tại') {
                            setSeverErorEmail(true);
                        } else if (response.messenger == 'Tên đăng nhập đã tồn tại') {
                            setSeverErorUser(true);
                        } else {
                            setSeverErorEmail(false);
                            setSeverErorUser(false);
                            setSeverErorPhone(false);
                            alert('Đăng ký thành công!');
                            setTimeout(() => {
                                setShowModal(false);
                                setShowLoginModal(true);
                            }, 1000);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                alert('Đăng ký không thành công. Vui lòng thử lại!');
            }
        } else {
            setPasswordsMatch(true);
        }
    };

    return (
        <div
            id="modal-wrapper"
            onClick={handleClose}
            className="z-10 fixed inset-0 bg-[#2B92E4] bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
        >
            <div id="modal-content" className="flex flex-col rounded-2xl items-center text-center">
                <div className="bg-white rounded-2xl shadow-2xl flex w-[850px]">
                    {/* {/ Register Section /} */}
                    <div className="w-2/4 py-36 px-12 bg-[#2B92E4] text-white rounded-tl-2xl rounded-bl-2xl flex flex-col justify-center items-center align-middle">
                        <h2 className="font-bold text-3xl mb-2">Đăng nhập</h2>
                        <div className="border-2 w-10 border-white inline-block mb-2"></div>
                        <p className="mb-10">Bạn đã có tài khoản ?</p>
                        <button
                            onClick={() => {
                                setShowModal(false);
                                setShowLoginModal(true);
                            }}
                            className="border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-[#2B92E4]"
                        >
                            Đăng nhập
                        </button>
                    </div>

                    {/* {/ Login Section /} */}
                    <div className="w-3/4 p-5 relative">
                        {/* {/ Close Button /} */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-0 right-0 mt-2 mr-3 text-red text-xl text-black"
                        >
                            <IoCloseCircleSharp />
                        </button>
                        <div className="text-left font-bold">
                            <span className="text-[#2B92E4]">Motorbike</span> Ecommerce
                        </div>
                        <form onSubmit={handleSubmit(dataSubmit)} className="py-10" style={{ padding: '0' }}>
                            <h2 className="text-3xl font-bold text-gray-600 mb-2">Đăng ký</h2>
                            <div className="border-2 w-10 border-gray-600 inline-block mb-2"></div>
                            <p className=" my-3 text-gray-400 ">Tạo tài khoản</p>

                            <div style={{ display: 'grid', gap: '3px' }} className="flex flex-col">
                                {/* {/ Username Field /} */}
                                <InputComponent
                                    icon={<FaUser className=" m-2" />}
                                    placeholder="Họ và tên(*)"
                                    textMessage="Vui lòng nhập họ và tên "
                                    register={register}
                                    name="fullName"
                                    errors={errors}
                                    setValue={setValue}
                                    minLength={{ value: 6, message: 'Tên đăng nhập ít nhất 6 ký tự' }}
                                    pattern={{
                                        value: /^[^0-9!@#$%^&*()_+|~=`{}\[\]:";'<>?,.\/].*$/,
                                        message: 'Chỉ được phép nhập chữ cái',
                                    }}
                                    handleReset={handleReset}
                                />
                                {/* {/     email /} */}
                                <InputComponent
                                    icon={<MdEmail className=" m-2" />}
                                    placeholder="Email(*)"
                                    textMessage="Vui lòng nhập Email "
                                    register={register}
                                    name="email"
                                    errors={errors}
                                    setValue={setValue}
                                    handleReset={handleReset}
                                    pattern={{
                                        value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                        message: 'Email không hợp lệ',
                                    }}
                                    severErorEmail={severErorEmail}
                                />
                                {/* {/ Telephone /} */}
                                <InputComponent
                                    icon={<BsFillTelephoneFill className=" m-2" />}
                                    placeholder="Số điện thoại(*)"
                                    textMessage="Vui lòng nhập số điện thoại "
                                    register={register}
                                    name="phoneNumber"
                                    errors={errors}
                                    setValue={setValue}
                                    handleReset={handleReset}
                                    pattern={{
                                        value: /^0\d*$/,
                                        message: 'Số điện thoại không hợp lệ',
                                    }}
                                    maxLength={{
                                        value: 10,
                                        message: 'Số điện thoại phải 10 số',
                                    }}
                                    minLength={{ value: 10, message: ' Số điện thoại phải 10 số' }}
                                    severErorPhone={severErorPhone}
                                />
                                {/* {/ Username /} */}
                                <InputComponent
                                    icon={<FaUser className=" m-2" />}
                                    placeholder="Tên đăng nhập(*)"
                                    textMessage="Vui lòng nhập tên đăng nhập "
                                    register={register}
                                    name="username"
                                    setValue={setValue}
                                    handleReset={handleReset}
                                    errors={errors}
                                    minLength={{ value: 6, message: ' Tên đăng nhập phải ít nhất 6 kí tự' }}
                                    pattern={{
                                        value: /^(?![\d@!#$%^&*()_+|~=`{}\[\]:";'<>?,.\/])[a-zA-Z@!#$%^&*()_+|~=`{}\[\]:";'<>?,.\/\d]{6,}$/,
                                        message: 'Tên đăng nhập không được bắt đầu ký tự đặc biệt hoặc số',
                                    }}
                                    severErorUser={severErorUser}
                                />
                                {/* {/ Password Field /} */}
                                <InputComponent
                                    icon={<MdLockOutline className=" m-2" />}
                                    placeholder="Mật khẩu(*)"
                                    textMessage="Vui lòng nhập mật khẩu "
                                    register={register}
                                    name="password"
                                    handleReset={handleReset}
                                    errors={errors}
                                    type="password"
                                    typePassword={true}
                                    setValue={setValue}
                                    minLength={{ value: 6, message: ' Mật khẩu phải ít nhất 6 kí tự ' }}
                                    pattern={{
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'Mật khẩu bắt buộc gồm số, chữ cái thường, chữ cái hoa, ký hiệu',
                                    }}
                                />

                                {/* {/ Confirm password Field /} */}

                                <InputComponent
                                    icon={<MdLockOutline className=" m-2" />}
                                    placeholder="Nhập lại mật khẩu(*)"
                                    textMessage="Vui lòng nhập mật khẩu "
                                    register={register}
                                    name="ConfirmPassword"
                                    setValue={setValue}
                                    errors={errors}
                                    passwordsMatch={passwordsMatch}
                                    type="password"
                                    typePassword={true}
                                    handleReset={handleReset}
                                    minLength={{ value: 6, message: 'Mật khẩu phải ít nhất 6 kí tự ' }}
                                    pattern={{
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: 'Mật khẩu bắt buộc gồm số, chữ cái thường, chữ cái hoa, ký hiệu',
                                    }}
                                />

                                {/* {/ Địa chỉ Field /} */}

                                <InputComponent
                                    icon={<ImLocation className=" m-2" />}
                                    placeholder="Địa chỉ(*)"
                                    textMessage="Vui lòng nhập địa chỉ "
                                    register={register}
                                    handleReset={handleReset}
                                    name="address"
                                    errors={errors}
                                    setValue={setValue}
                                />

                                <button
                                    style={{
                                        width: '180px',
                                        marginLeft: '50%',
                                        transform: 'translateX(-50%)',
                                        marginTop: '5px',
                                        color: 'while',
                                        border: '2px solid black',
                                    }}
                                    className="border-2 border-[#2B92E4]  rounded-full px-12 py-2 inline-block font-semibold hover:bg-[#2B92E4] hover:text-white"
                                >
                                    Đăng ký
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default RegisterModal;
