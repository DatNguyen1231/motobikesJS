import React, { useState, useRef } from 'react';
import { FaUpload } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const ImageUploader = ({ onImagesChange }) => {
    const [localImages, setLocalImages] = useState([]);
    const [imageError, setImageError] = useState('');
    const fileInputRef = useRef(null);

    const handleFilesUpload = (files) => {
        const filesArray = Array.from(files);
        const newImagePromises = filesArray.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(newImagePromises).then((images) => {
            const newImages = images.map((img) => ({ imgData: img, content: '' }));
            if (localImages.length + newImages.length <= 4) {
                const updatedImages = [...localImages, ...newImages];
                setLocalImages(updatedImages);
                onImagesChange(updatedImages);
                setImageError('');
            } else {
                setImageError('Không thể upload hơn 4 ảnh.');
            }
        });
    };

    const handleImageChange = (event) => {
        if (event.target.files.length === 0) {
            setImageError('Vui lòng chọn ảnh.');
        } else {
            setImageError('');
            handleFilesUpload(event.target.files);
        }
    };

    const handleRemoveImage = (index) => {
        const updatedImages = localImages.filter((_, i) => i !== index);
        setLocalImages(updatedImages);
        onImagesChange(updatedImages);
    };

    return (
        <div className="flex flex-col items-start mb-4">
            <h2 className="mb-3 text-lg">Ảnh</h2>

            {imageError && <p className="text-red-500 text-sm mb-2">{imageError}</p>}

            <div className="grid grid-cols-4 gap-4">
                {localImages.map((image, index) => (
                    <div key={index} className="w-full h-32 border border-gray-300 overflow-hidden rounded-md relative">
                        <img
                            src={`data:image/jpeg;base64,${image.imgData}`}
                            alt="Preview"
                            className="object-cover w-full h-full"
                        />
                        <button
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white p-1 rounded-full"
                            onClick={() => handleRemoveImage(index)}
                        >
                            <IoClose />
                        </button>
                    </div>
                ))}
                {[...Array(Math.max(0, 4 - localImages.length))].map((_, index) => (
                    <label
                        key={index}
                        htmlFor={`image-upload-${index}`}
                        className="w-28 h-28 border-2 bg-[#D9D9D9] border-gray-300 rounded-md cursor-pointer flex justify-center items-center"
                    >
                        <FaUpload className="text-2xl text-white" />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id={`image-upload-${index}`}
                            onChange={handleImageChange}
                        />
                    </label>
                ))}
            </div>

            <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageChange}
            />

            <button
                className="bg-[#2B92E4] hover:bg-[#12419b] text-white font-bold py-2 px-4 rounded flex items-center align-middle mt-4"
                onClick={() => fileInputRef.current.click()}
            >
                <FaUpload />
                <span className="ml-2">Tải ảnh lên</span>
            </button>
        </div>
    );
};

export default ImageUploader;
