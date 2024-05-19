import React, { useState, useEffect } from 'react';
import { updateProduct } from '@/pages/api/api';
import CategorySelector from '@/components/constants/CategorySelector';
import CategoryDropdown from '@/components/constants/CategoryDropdown';
import ImageUploader from '@/components/constants/ImageUploader';
import DescriptionUploader from '@/components/constants/DescriptionUploader';
import TitleManager from '@/components/constants/TitleManager';
import SuccessModal from '@/components/SuccessModal';

const UpdateProducts = ({ activeContent, changeContent, product }) => {
    const productId = product && product.id;
    const [productName, setProductName] = useState(product.name);
    const [price, setPrice] = useState(product?.originalPrice.toString() || '0');
    const [discountPercentage, setDiscountPercentage] = useState(product?.discount.toString() || '0');
    const [quantity, setQuantity] = useState(product.quantity.toString());
    const [detailType, setDetailType] = useState(product.detailType);
    const [images, setImages] = useState(product.images);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [description, setDescription] = useState(product.description);
    const [category, setCategory] = useState(product?.category || '');
    const [idTypeProduct, setIdTypeProduct] = useState(product?.idTypeProduct || '');

    const handleProductNameChange = (e) => setProductName(e.target.value);
    const handlePriceChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setPrice(value);
    };
    const handleQuantityChange = (e) => setQuantity(e.target.value);
    const handleDiscount = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        setDiscountPercentage(value);
    };
    const handleCategoryChange = (value) => setCategory(value);
    const handleIdTypeProductChange = (value) => {
        const [link, type] = value.split(',');
        setIdTypeProduct(parseInt(link, 10));
        setDetailType(parseInt(type, 10));
    };

    // Update product
    const handleUpdateProduct = async () => {
        const productData = {
            name: productName,
            price: parseFloat(price),
            quantity: parseInt(quantity, 10),
            detailType: parseInt(detailType, 10),
            idTypeProduct: parseInt(idTypeProduct, 10),
            discount: parseFloat(discountPercentage),
            describe: description || 'Không ',
            images: images.map((img) => ({
                idImg: img.idImg,
                imgData: img.imgData,
                content: img.content,
            })),
        };

        const response = await updateProduct(product.id, productData);

        if (response && response.status === 200) {
            setShowSuccessModal(true);
        } else {
            const errorMessage = response.message || 'Có lỗi đã xảy ra!';
        }
    };

    // Discount calculation
    const calculateDiscount = () => {
        const originalPrice = parseFloat(price) || 0;
        const discount = parseFloat(discountPercentage) / 100;
        const discountedPrice = originalPrice * (1 - discount);
        return originalPrice && !isNaN(discountedPrice) ? `${discountedPrice.toLocaleString('vi-VN')} VNĐ` : '';
    };

    return (
        <div className="mx-auto">
            <div className="flex items-center justify-between mb-4">
                <TitleManager activeContent={activeContent} />
            </div>

            <div className="bg-white p-4 md:px-10 pb-10 md:pb-0">
                <div className="mb-6">
                    <CategorySelector onCategoryChange={handleCategoryChange} />
                </div>

                {/* Product Name */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h2 className="mb-3 text-lg">Tên sản phẩm</h2>
                        <input
                            type="text"
                            className="px-3 py-2 border rounded-md text-base w-64"
                            value={productName}
                            onChange={handleProductNameChange}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <h2 className="mb-3 text-lg">Danh mục</h2>
                        <CategoryDropdown
                            category={category}
                            onValueChange={handleIdTypeProductChange}
                            detailType={detailType}
                            idTypeProduct={idTypeProduct}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <h2 className="mb-3 text-lg">Giá</h2>
                        <input
                            type="text"
                            className="px-3 py-2 border rounded-md text-base w-64"
                            value={`${parseInt(price).toLocaleString('vi-VN')} VNĐ`}
                            onChange={handlePriceChange}
                        />
                    </div>

                    {/* Discount Percentage */}
                    <div>
                        <h2 className="mb-3 text-lg">Phần trăm giảm giá</h2>
                        <input
                            type="text"
                            className="px-3 py-2 border rounded-md text-base w-64"
                            value={discountPercentage + (discountPercentage ? '%' : '')}
                            onChange={handleDiscount}
                            onFocus={(e) => e.target.value === '0%' && setDiscountPercentage('')}
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    setDiscountPercentage('0');
                                }
                            }}
                        />
                    </div>

                    {/* Discounted Price */}
                    <div>
                        <h2 className="mb-3 text-lg">Giá sau khi đã giảm</h2>
                        <input
                            type="text"
                            className="px-3 py-2 border rounded-md text-base w-64 bg-[#D8D8D8]"
                            value={calculateDiscount()}
                            readOnly
                        />
                    </div>

                    {/* Quantity */}
                    <div>
                        <h2 className="mb-3 text-lg">Số lượng</h2>
                        <input
                            type="number"
                            className="px-3 py-2 border rounded-md text-base w-64"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                </div>

                {/* Images Uploader */}
                <div className="mt-6">
                    <ImageUploader onImagesChange={setImages} />
                </div>

                {/* Caution */}
                <div className="mt-6">
                    <span className="text-base font-thin text-red-500">
                        * Lưu ý: Chỉ được thêm tối đa 4 ảnh. Hỗ trợ tệp .jpg, .png, ...
                    </span>
                </div>

                {/* Description */}
                <div className="mt-6">
                    <DescriptionUploader description={description} setDescription={setDescription} />
                </div>

                <div className="flex justify-end mt-6 p-4 space-x-4">
                    {showSuccessModal && (
                        <SuccessModal
                            setShowSuccessModal={setShowSuccessModal}
                            title="Cập nhật sản phẩm thành công!"
                            message="Chào mừng bạn đến với Motobike Ecommerce."
                            onClose={() => {
                                setShowSuccessModal(false);
                                changeContent('products');
                            }}
                        />
                    )}
                    <button
                        onClick={handleUpdateProduct}
                        className="bg-[#2B92E4] hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Cập nhật
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateProducts;
