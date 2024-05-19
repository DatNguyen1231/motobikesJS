import React, { useState, useEffect, useContext } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io';
import { useRouter } from 'next/router';
import { DetailProductData, ReviewsData } from '@/pages/api/api';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { AuthContext } from '@/context/AuthContext';
import { addToCart } from '@/pages/api/api';

const DetailProduct = () => {
    const [activeImg, setActiveImage] = useState('');
    const router = useRouter();
    const { id } = router.query;
    const [reviewData, setReviewData] = useState({
        comments: [],
        quantityReviews: 0,
        averageRating: 0,
    });
    const [productDetail, setProductDetail] = useState(null);
    const { increaseQty, decreaseQty, qty, setQty } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState('');

    // Quantity adjustment with validation
    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value, 10);
        // Ensure the input is a number and not less than 1
        if (!isNaN(value) && value >= 1) {
            setQty(value);
            if (value > productDetail.quantity) {
                setErrorMessage(`Số lượng sản phẩm trong kho chỉ còn lại ${productDetail.quantity} sản phẩm.`);
            } else {
                setErrorMessage('');
            }
        }
    };

    useEffect(() => {
        // Fetch product details with id
        if (id) {
            DetailProductData(id)
                .then((productDetail) => {
                    setProductDetail(productDetail);
                    if (productDetail && productDetail.images && productDetail.images.length > 0) {
                        setActiveImage('data:image/png;base64,' + productDetail.images[0].imgData);
                    }
                })
                .catch((error) => {
                    console.error(error.message);
                });
            // Fetch reviews for the product
            ReviewsData(id)
                .then((data) => {
                    if (data) {
                        setReviewData({
                            ...data,
                            averageRating: isNaN(parseFloat(data.averageRating)) ? 0 : parseFloat(data.averageRating),
                        });
                    }
                })
                .catch((error) => {
                    console.error('Failed to fetch reviews:', error);
                });
        }
    }, [id]);

    useEffect(() => {
        if (productDetail && qty > productDetail.quantity) {
            setErrorMessage(`Số lượng sản phẩm trong kho chỉ còn lại ${productDetail.quantity} sản phẩm.`);
        } else {
            setErrorMessage('');
        }
    }, [qty, productDetail]);

    const handleAddToCart = async () => {
        if (qty > productDetail.quantity) {
            setErrorMessage(`Số lượng sản phẩm trong kho chỉ còn lại ${productDetail.quantity} sản phẩm.`);
        } else {
            const result = await addToCart(productDetail.id, qty);
           alert(result.data.messenger);
        }
    };

    const handleBuyNow = async () => {
        if (qty > productDetail.quantity) {
            setErrorMessage(`Số lượng sản phẩm trong kho chỉ còn lại ${productDetail.quantity} sản phẩm.`);
        } else {
            const result = await addToCart(productDetail.id, qty);
           if (result.data.messenger==="Thêm vào giỏ hàng thành công") {
            alert(result.data.messenger);
            router.push('/CartPage');
        } else {
              alert(result.data.messenger);
            }
        }
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 > 0;
        const emptyStars = Math.floor(5 - rating);

        return (
            <>
                {[...Array(fullStars)].map((_, index) => (
                    <IoIosStar key={`full-${index}`} className="text-yellow-500 text-2xl" />
                ))}
                {halfStar && <IoIosStarHalf className="text-yellow-500 text-2xl" />}
                {[...Array(emptyStars)].map((_, index) => (
                    <IoIosStarOutline key={`empty-${index}`} className="text-yellow-500 text-2xl" />
                ))}
            </>
        );
    };

    // Make sure to handle loading state or check if productDetail is null before trying to render details
    if (!productDetail) return <div>Loading...</div>;

    return (
        <div className="rounded-lg overflow-hidden">
            <div className="max-w-8xl mx-auto px-28 py-10">
                <div className="flex flex-col lg:flex-row gap-5 shadow-2xl ">
                    <div className="flex flex-col gap-4 lg:w-2/4 p-10 bg-[#FFFFFF] rounded-l-xl">
                        <h1 className="text-[#000000] text-3xl font-bold">{productDetail.name}</h1>
                        <h6 className="text-[#D3D3D3] text-xl font-semibold">Bảo hành tại Motorbike</h6>
                        <div className="flex ">
                            {renderStars(reviewData.averageRating)}
                            <div>
                                <h3 className="text-xl font-bold text-[#777777] ml-4">
                                    {reviewData.averageRating} ({reviewData.quantityReviews} đánh giá)
                                </h3>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center max-w-3xl max-h-96">
                            <div className="max-w-2xl max-h-96 mt-10 flex justify-center items-center bg-gray-100 rounded-xl overflow-hidden">
                                <img
                                    src={activeImg}
                                    alt="Active product image"
                                    className="max-w-full max-h-full object-contain rounded-xl mix-blend-multiply"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center items-center mt-5">
                            <div className="flex flex-row gap-4 h-32 max-w-xl justify-center p-2 rounded-lg">
                                {productDetail.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-center w-40 h-24 overflow-hidden rounded-md cursor-pointer ${
                                            'data:image/png;base64,' + image.imgData === activeImg ? 'shadow-2xl' : ''
                                        } bg-[#D9D9D9]`}
                                        onClick={() => setActiveImage('data:image/png;base64,' + image.imgData)}
                                    >
                                        <img
                                            src={'data:image/png;base64,' + image.imgData}
                                            alt={`Hình ảnh ${index + 1}`}
                                            className="object-contain mix-blend-multiply"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Product Description */}
                    <div className="flex flex-col gap-6 lg:w-2/4 p-10 bg-[#D9D9D9] rounded-r-lg">
                        <div className="flex items-center bg-[#D9D9D9">
                            {/* New Price */}
                            <h6 className="text-3xl text-[#2B92E4] font-bold">
                                {productDetail.newPrice.toLocaleString('vi-VN')} <span>&#8363;</span>
                            </h6>
                            {/* Old Price */}
                            <span className="text-xl font-medium text-[#777777] line-through ml-5">
                                {productDetail.originalPrice.toLocaleString('vi-VN')} <span>&#8363;</span>
                            </span>
                            {/* Discount */}
                            <div className="ml-5 bg-[#2B92E4] px-3 flex items-center justify-center rounded-md">
                                <span className="text-md font-medium text-black">-{productDetail.discount}%</span>
                            </div>
                        </div>

                        {/* Quantity */}
                        <h6 className="text-2xl font-bold">Số lượng: {productDetail.quantity}</h6>

                        <h6 className="text-[#000000] text-2xl font-bold">Mô tả sản phẩm:</h6>
                        {/* Product Description */}
                        <p className="text-gray-700 text-xl py-10">{productDetail.describe}</p>

                        {/* Quantity adjustment */}
                        <div className="flex items-center rounded-lg">
                            <button onClick={decreaseQty} className="px-4 py-4 border bg-white">
                                <FiMinus />
                            </button>
                            <input
                                className="w-10 text-center border py-3"
                                type="number"
                                min="1"
                                value={qty}
                                onChange={handleQuantityChange}
                                onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))} // Restricts input to numbers only
                            />
                            <button onClick={increaseQty} className="px-4 py-4 border bg-white">
                                <FiPlus />
                            </button>
                        </div>

                        {/* Error Message */}
                        {errorMessage && <div className="text-[#FF0000] text-sm ">{errorMessage}</div>}

                        {/* Add to Cart Button */}
                        <div className="flex justify-center space-x-4">
                            {/* Add to Cart Button */}
                            <button
                                className="flex items-center justify-center bg-[#2B92E4] text-white text-2xl rounded-lg px-3 py-3 text-center w-1/3 hover:shadow-lg transition-shadow duration-200 ease-in-out"
                                onClick={handleAddToCart}
                            >
                                <FaCartPlus className="text-white mr-2" />
                            </button>
                            {/* Buy now Button */}
                            <button
                                className="bg-[#2B92E4] text-white font-bold rounded-lg text-[15px] px-5 py-1.5 text-center w-2/3 hover:shadow-lg transition-shadow duration-200 ease-in-out"
                                onClick={handleBuyNow}
                            >
                                Mua ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailProduct;
