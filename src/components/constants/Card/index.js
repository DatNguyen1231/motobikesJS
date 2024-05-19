import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FaCartPlus } from 'react-icons/fa';
import { addToCart } from '@/pages/api/api';

const ProductCard = ({ product, style }) => {
    const edit = style ? `style={{width:'100%',margin:'0 3px '}}` : null;
    const router = useRouter();

    const handleCardClick = () => {
        router.push(`/DetailProduct?id=${product.id}`);
    };

    // Add to cart
    const handleAddToCart = async (e) => {
        e.stopPropagation();

        const result = await addToCart(product.id, 1);
        alert(result.data.messenger);
    };

    // Buy now
    const handleBuyNow = async (e) => {
        e.stopPropagation();
        const result = await addToCart(product.id, 1);
       if (result.data.messenger==="Thêm vào giỏ hàng thành công") {
            alert(result.data.messenger);
            router.push('/CartPage');
        } else {
              alert(result.data.messenger);
        }
    };

    return (
        <div style={style} className="relative flex justify-center m-10 cursor-pointer" onClick={handleCardClick}>
            <div className="w-full bg-[#f9f9f9] rounded-lg shadow-2xl relative">
                {product && product.images && product.images.length > 0 && (
                    <img
                        className="p-5 rounded-t-lg mix-blend-multiply w-full h-48 object-contain"
                        src={'data:image/png;base64,' + product.images[0].imgData}
                        alt={product.name}
                    />
                )}
                {product.discount && (
                    <div className="absolute top-0 right-0 bg-[#2B92E4] text-white font-medium px-2 rounded">
                        -{product.discount}%
                    </div>
                )}

                <div className="px-7 pb-5 text-center">
                    {/* Products Name */}
                    {product && product.name && (
                        <h5 className="text-xl font-bold tracking-tight text-black">{product.name}</h5>
                    )}
                    {/* Price */}
                    {product && product.originalPrice && (
                        <div className="flex items-center justify-between my-3">
                            <span className="text-[18px] font-bold text-[#FF0000] mr-3">
                                {product.newPrice.toLocaleString('vi-VN')} VNĐ
                            </span>
                            <span className="text-[14px] font-bold text-[#777777] line-through">
                                {product.originalPrice.toLocaleString('vi-VN')} VNĐ
                            </span>
                        </div>
                    )}
                    <div className="flex justify-center space-x-4">
                        {/* Add to Cart Button */}
                        <button
                            className="flex items-center justify-center bg-[#2B92E4] text-white text-2xl rounded-lg px-3 py-1.5 text-center w-1/3 hover:shadow-lg transition-shadow duration-200 ease-in-out"
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
    );
};

export default ProductCard;
