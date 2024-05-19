import PropTypes from 'prop-types';
import { IoEyeOff } from 'react-icons/io5';
import { useState, useRef } from 'react';
import { MdEdit } from 'react-icons/md';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function InputComponent({
    type,
    placeholder,
    icon,
    textMessage,
    register,
    name,
    errors,
    pattern,
    passwordsMatch,
    minLength,
    typePassword,
    severErorEmail,
    severErorPhone,
    severErorUser,
    handleReset,
    maxLength,
    ...props
}) {
    const [eye, SetEye] = useState(false);

    const checkErr = () => {
        if (errors[name] || severErorEmail || severErorUser || severErorUser || passwordsMatch) {
            return 'red';
        } else {
            return 'transparent';
        }
    };

    const handleEye = () => {
        SetEye(!eye);
    };

    return (
        <>
            <div style={{ alignItems: 'center', border: `0.5px solid ${checkErr()}` }} className="bg-gray-100 p-2 flex">
                {icon}
                <input
                    id="input"
                    name={name}
                    type={typePassword ? (eye ? 'text' : 'password') : 'text'}
                    placeholder={placeholder}
                    onInput={() => {
                        handleReset ? handleReset() : null;
                    }}
                    className="w_64 bg_transparent bg-gray-100 outline-none text-sm ml-2 flex-1"
                    {...register(name, { required: textMessage, pattern, minLength, maxLength })}
                    {...props}
                />
                {typePassword ? <span onClick={handleEye}>{eye ? <FaEye /> : <IoEyeOff />} </span> : ''}
            </div>
            <div
                style={{
                    textAlign: 'start',
                }}
            >
                {errors[name] && <p style={{ fontSize: '12px', color: 'red' }}>{errors[name].message}</p>}
                {passwordsMatch && (
                    <p style={{ fontSize: '12px', color: 'red' }}>
                        {errors[name] ? null : 'Mật khẩu không trùng khớp '}
                    </p>
                )}
                {severErorEmail && (
                    <p style={{ fontSize: '12px', color: 'red' }}>{errors[name] ? null : `Email đã tồn tại `}</p>
                )}
                {severErorPhone && (
                    <p style={{ fontSize: '12px', color: 'red' }}>
                        {errors[name] ? null : `Số điện thoại đã tồn tại `}
                    </p>
                )}
                {severErorUser && (
                    <p style={{ fontSize: '12px', color: 'red' }}>{errors[name] ? null : `User đã tồn tại `}</p>
                )}
            </div>
        </>
    );
}

export default InputComponent;
InputComponent.defaultProps = {
    type: 'text ',
    placeholder: 'placeholder',
    textMessage: 'textMessage',
    pattern: null,
};

InputComponent.propTypes = {
    type: PropTypes.string,
    placeholder: PropTypes.string,
    textMessage: PropTypes.string,
    pattern: PropTypes.object,
};

// Input Login Field
export const InputLoginField = ({ Icon, type = 'text', placeholder, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputRef = useRef(null);

    const handleClick = () => {
        inputRef.current.focus();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={`bg-gray-100 w-[80%] p-2 flex items-center mb-3 ${error ? 'border-red-500 border' : ''}`}>
            <Icon className="text-black m-2" onClick={handleClick} />
            <input
                type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
                placeholder={placeholder}
                className="bg-gray-100 outline-none text-sm flex-1"
                value={value}
                onChange={onChange}
                ref={inputRef}
            />
            {type === 'password' && (
                <div onClick={togglePasswordVisibility} className="cursor-pointer p-2">
                    {showPassword ? <FaEye className="text-black" /> : <FaEyeSlash className="text-black" />}
                </div>
            )}
        </div>
    );
};
export const InputProfileField = ({ label, id, value, isEditable, onChange, toggleEdit, showEditButton = true }) => {
    return (
        <div className="col-span-6 sm:col-span-3">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-3">
                    {label}
                </label>
            )}
            <div className="relative w-full">
                <input
                    type="text"
                    onChange={onChange}
                    value={value}
                    readOnly={!isEditable}
                    id={id}
                    className={`w-full px-3 py-2 pr-10 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 ${
                        !isEditable && 'bg-gray-100'
                    }`}
                />
                {showEditButton && (
                    <button
                        type="button"
                        onClick={toggleEdit}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        <MdEdit />
                    </button>
                )}
            </div>
        </div>
    );
};
