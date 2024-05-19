import { addToCart } from '@/pages/api/api';
import React from 'react';
import { FaCartPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';


const ProductCard = ({ product, style }) => {
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
        <div onClick={handleCardClick} style={style} className="relative flex justify-center m-10">
            <div
                style={{ width: '100%', margin: '0 3px ' , cursor:'pointer'}}
                className="  w-80 bg-[#f9f9f9] rounded-lg shadow-md relative"
            >
                {product && product.images && product.images.length > 0 && (
                    <img
                        className="p-5 rounded-t-lg mix-blend-multiply w-full h-48 object-contain"
                        src={'data:image/png;base64,' + product.images[0].imgData}
                        alt={product.name}
                    />
                )}
                {product.discount && (
                    <div
                        style={{ color: 'white' }}
                        className="absolute top-0 right-0 bg-[#2B92E4] text-black font-medium px-2 rounded"
                    >
                        - {product.discount}%
                    </div>
                )}

                <div className="px-7 pb-5 text-center">
                    {/* Products Name */}
                    {product && product.name && (
                        <h5 className="text-xl font-bold tracking-tight text-black min-h-14">{product.name}</h5>
                    )}
                    {/* Price */}
                    {product && product.originalPrice && (
                        <div className="flex justify-between items-center my-3">
                            <span className="text-[12px] font-bold text-[#FF0000] h-9">
                                {product.newPrice.toLocaleString('vi-VN')} <span>VND</span>
                            </span>
                            <span className="text-[10px] font-bold text-[#777777] h-9 line-through">
                                {product.originalPrice.toLocaleString('vi-VN')} <span>VND</span>
                            </span>
                        </div>
                    )}
                    <div className="flex justify-center space-x-4">
                        {/* Add to Cart Button */}
                        <button 
                            onClick={handleAddToCart}
                        className="flex items-center justify-center bg-[#2B92E4] text-white text-2xl rounded-lg px-3 py-1.5 text-center w-1/3 hover:shadow-lg transition-shadow duration-200 ease-in-out">
                            <FaCartPlus className="text-white mr-2" />
                        </button>
                        {/* Buy now Button */}
                        <button 
                        onClick={handleBuyNow}
                        className="bg-[#2B92E4] text-white font-bold rounded-lg text-[15px] px-5 py-1.5 text-center w-2/3 hover:shadow-lg transition-shadow duration-200 ease-in-out">
                            Mua ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
