import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { AiTwotoneShop } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa6';
import { getCartByUser } from '@/pages/api/api';
import axiosInstance from '@/pages/api/axios';
import { FaExclamation } from 'react-icons/fa6';

const CartPage = () => {
    const router = useRouter();
    const [cartProducts, setCartProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [content, setContent] = useState('');
    const [errors, setErrors] = useState({});

    // Fetch Cart Products
    useEffect(() => {
        const fetchCartProducts = async () => {
            try {
                const response = await getCartByUser();
                if (response && response.cart) {
                    setTotalPrice(response.cart.totalPrice); // Cập nhật giá trị totalPrice
                    if (response.cart.shoppingCartDetailsDto) {
                        const productsWithQuantities = response.cart.shoppingCartDetailsDto.map((product) => ({
                            ...product,
                            quantity: product.quantityCart,
                        }));
                        setCartProducts(productsWithQuantities);
                    }
                }
            } catch (error) {
                console.error('Có lỗi đã xảy ra:', error);
            }
        };
        fetchCartProducts();
    }, []);

    // Update Total Price
    const updateTotalPrice = (products) => {
        let totalPrice = 0;
        products.forEach((product) => {
            totalPrice += product.quantity * product.productSomeReponseDto.newPrice;
        });
        setTotalPrice(totalPrice);
    };

    // Update quantity Cart
    const updateQuantity = async (productId, increase = true) => {
        const product = cartProducts.find((p) => p.productSomeReponseDto.id === productId);
        if (!product) return;

        let newQuantity = product.quantity;
        if (!increase && newQuantity === 1) {
            await onDelete(product.id);
            return;
        }

        // Increase or decrease quantity
        newQuantity += increase ? 1 : -1;

        try {
            const response = await axiosInstance.put(
                `/user/shopping-cart/update-cart?idCartDetail=${product.id}&quantityCart=${newQuantity}`,
            );
            if (response.status === 200) {
                const updatedProducts = cartProducts.map((item) =>
                    item.productSomeReponseDto.id === productId ? { ...item, quantity: newQuantity } : item,
                );
                setCartProducts(updatedProducts);
                updateTotalPrice(updatedProducts);
            } else {
                throw new Error('Failed to update cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    // Delete product
    const onDelete = async (cartDetailId) => {
        try {
            const userToken = localStorage.getItem('userToken');
            const response = await axiosInstance.delete(`/user/shopping-cart/delete?id=${cartDetailId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            if (response.status === 200) {
                const deletedCartProducts = cartProducts.filter((item) => item.id !== cartDetailId);
                setCartProducts(deletedCartProducts);
                updateTotalPrice(deletedCartProducts);
            } else {
                throw new Error('Có lỗi đã xảy ra:');
            }
        } catch (error) {}
    };

    const handleFullNameChange = (e) => {
        setFullName(e.target.value);
        if (errors.fullName) {
            setErrors({ ...errors, fullName: '' });
        }
    };

    const handlePhoneNumberChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setPhoneNumber(value);
            if (errors.phoneNumber) {
                setErrors({ ...errors, phoneNumber: '' });
            }
        }
    };

    const handleSubmit = () => {
        if (cartProducts.length === 0) {
            return;
        }
        const errors = {};

        if (!fullName.trim()) {
            errors.fullName = 'Bạn phải nhập họ và tên';
        }

        if (!phoneNumber.trim()) {
            errors.phoneNumber = 'Bạn phải nhập số điện thoại';
        } else if (phoneNumber.trim().length !== 10) {
            errors.phoneNumber = 'Số điện thoại phải 10 số';
        }

        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const userInfo = {
                fullName,
                phoneNumber,
                email,
                address,
                content,
            };
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            router.push('/InfomationOder');
        }
    };

    return (
        <div className="p-5 mb-14">
            <div className="max-w-7xl mx-auto">
                {/* Title With Lines */}
                <div className="flex items-center text-center my-8">
                    <div className="flex-grow h-0.5 bg-black"></div>
                    <span className="px-4 text-3xl font-bold text-black">Giỏ hàng</span>
                    <div className="flex-grow h-0.5 bg-black"></div>
                </div>
                <div className="flex flex-wrap -mx-2">
                    {/* Left Column */}
                    <div className="w-full md:w-1/2 lg:w-3/5 px-2 mb-4 md:mb-0">
                        {/* Customer Information Form */}
                        <div className="mb-4 p-4 bg-white rounded-xl shadow-xl">
                            <h2 className="text-lg font-bold mb-2 uppercase">Thông tin khách hàng</h2>
                            <p className="mb-2 text-[#7f7f7f]">Chọn cách thức mua hàng</p>
                            <button className="flex flex-row items-center bg-[#f8fafc] text-black font-semibold py-2 px-4 rounded-lg mb-4">
                                <AiTwotoneShop className="mr-2 text-[#7f7f7f]" />
                                Nhận tại cửa hàng
                            </button>
                            {/* Form Fields */}
                            <div className="flex flex-wrap -mx-2 mb-4">
                                {/* FullName Field */}
                                <div className="w-1/2 px-2 mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Họ và tên <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Họ và tên"
                                        value={fullName}
                                        onChange={handleFullNameChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.fullName ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                                </div>

                                {/* PhoneNumber Field */}
                                <div className="w-1/2 px-2 mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Số điện thoại <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="Số điện thoại"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        className={`w-full p-2 border rounded ${
                                            errors.phoneNumber ? 'border-red-500' : ''
                                        }`}
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                                </div>
                            </div>

                            {/* Form fields */}
                            <div className="flex flex-wrap -mx-2 mb-4">
                                {/* Email field */}
                                <div className="w-1/2 px-2">
                                    <label className="block text-sm font-medium text-gray-700">Email</label>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="w-full p-2 border rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                {/* Address field */}
                                <div className="w-1/2 px-2">
                                    <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                    <input
                                        type="text"
                                        placeholder="Địa chỉ"
                                        className="w-full p-2 border rounded"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Textarea Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Nội dung</label>
                                <textarea
                                    placeholder="Nhập nội dung..."
                                    className="w-full p-2 border rounded"
                                    rows="4"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                ></textarea>
                            </div>
                        </div>

                        {/* Special Offers Form */}
                        <div className="p-4 bg-white rounded-lg shadow-xl">
                            <h2 className="text-lg font-bold mb-2">
                                Một số ưu đãi của khách hàng khi mua hàng bên shop
                            </h2>

                            <p className="flex flex-row items-center mb-2 text-[#7f7f7f]">
                                <FaCheck className="mr-3 text-2xl text-[#29D825]" />
                                Được nhận mã giảm giá hấp dẫn cho mỗi lần mua
                            </p>

                            <p className="flex flex-row items-center mb-2 text-[#7f7f7f]">
                                <FaCheck className="mr-3 text-2xl text-[#29D825]" />
                                Được bảo trì 3 lần cho một sản phẩm
                            </p>

                            <p className="flex flex-row items-center mb-2 text-[#7f7f7f]">
                                <FaCheck className="mr-3 text-2xl text-[#29D825]" />
                                Nhân viên tư vấn, hỗ trợ khách hàng nhiệt tình
                            </p>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 lg:w-2/5 px-2">
                        <div className="p-4 bg-white rounded-lg shadow-xl h-full">
                            <h2 className="text-lg font-bold mb-2 uppercase">Sản phẩm đã chọn</h2>
                            <div className="p-4 bg-white rounded-lg max-h-96 overflow-y-auto">
                                {/* Cart Products */}
                                {cartProducts.length > 0 ? (
                                    cartProducts.map((product) => (
                                        <div key={product.productSomeReponseDto.id} className="mb-6 relative">
                                            {/* Delete Button */}
                                            <button
                                                onClick={() => onDelete(product.id)}
                                                className="absolute top-0 right-0 p-2 rounded-full"
                                            >
                                                x
                                            </button>

                                            {/* Line */}
                                            <div className="border-t border-gray-200 my-2"></div>

                                            {/* Product Details */}
                                            <div className="flex items-center my-4">
                                                {product.productSomeReponseDto.images &&
                                                    product.productSomeReponseDto.images.length > 0 && (
                                                        <img
                                                            src={`data:image/png;base64,${product.productSomeReponseDto.images[0].imgData}`}
                                                            alt={product.productSomeReponseDto.name}
                                                            className="w-32 h-24 object-cover mr-4"
                                                        />
                                                    )}
                                                <div className="flex-grow">
                                                    <div className="flex items-center mb-2">
                                                        {/* Name And Discount */}
                                                        <h3 className="font-bold text-lg mr-5">
                                                            {product.productSomeReponseDto.name}
                                                        </h3>
                                                        <div className="bg-[#2B92E4] text-white font-medium px-2 rounded">
                                                            -{product.productSomeReponseDto.discount}%
                                                        </div>
                                                    </div>

                                                    {/* Price */}
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[17px] font-bold text-[#FF0000]">
                                                            {product.productSomeReponseDto.newPrice.toLocaleString(
                                                                'vi-VN',
                                                            )}{' '}
                                                            VNĐ
                                                        </span>
                                                        <span className="text-[15px] font-bold text-gray-500 line-through">
                                                            {product.productSomeReponseDto.originalPrice.toLocaleString(
                                                                'vi-VN',
                                                            )}
                                                            VNĐ
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Quantity Adjustment */}
                                            <div className="flex items-center rounded-lg">
                                                {/* Decrease Quantity */}
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(product.productSomeReponseDto.id, false)
                                                    }
                                                    className="px-3 py-1 border"
                                                >
                                                    -
                                                </button>

                                                {/* Quantity */}
                                                <input
                                                    className="w-10 text-center border py-1"
                                                    type="number"
                                                    min="1"
                                                    value={product.quantity}
                                                    readOnly
                                                />

                                                {/* Increase Quantity */}
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(product.productSomeReponseDto.id, true)
                                                    }
                                                    className="px-3 py-1 border"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center p-4 bg-[#D9D9D9] shadow-lg rounded-lg">
                                        <div className="flex flex-col items-center justify-center text-[#FF0000]">
                                            <FaExclamation className=" mb-2" size="24" />
                                            Giỏ hàng của bạn đang trống. Vui lòng thêm sản phẩm vào giỏ hàng trước khi
                                            đặt hàng.
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Total and Order Button */}
                            <div className="mt-6 p-4">
                                {/* Line */}
                                <div className="border-t border-gray-200 my-2"></div>
                                <div className="flex justify-between items-center mt-5">
                                    <div className="text-xl font-bold uppercase">Tổng tiền:</div>
                                    <div className="text-xl font-bold text-[#ff6700]">
                                        {totalPrice && totalPrice.toLocaleString('vi-VN')} VNĐ
                                    </div>
                                </div>

                                {/* Order Button */}
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-3 px-16 rounded-lg mt-5"
                                        onClick={handleSubmit}
                                    >
                                        Đặt hàng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPage;
