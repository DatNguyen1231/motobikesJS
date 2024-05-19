import React from 'react';

const CategorySelector = ({ onCategoryChange }) => {
    const handleRadioChange = (e) => {
        onCategoryChange(e.target.value);
    };

    return (
        <div className="flex items-center">
            <label className="mr-32 flex items-center text-xl font-bold">
                <input type="radio" name="category" value="motorbike" onChange={handleRadioChange} className="mr-1" />
                Xe máy
            </label>
            <label className="mr-32 flex items-center text-xl font-bold">
                <input type="radio" name="category" value="accessories" onChange={handleRadioChange} className="mr-1" />
                Phụ tùng
            </label>
        </div>
    );
};

export default CategorySelector;
