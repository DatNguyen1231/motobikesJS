import React from 'react';

const CategoryDropdown = ({ category, onValueChange }) => {
    const motorcycleBrands = [
        { name: 'Kawasaki', type: '1', link: '1' },
        { name: 'Ducati', type: '2', link: '1' },
        { name: 'Honda', type: '3', link: '1' },
        { name: 'Suzuki', type: '4', link: '1' },
    ];

    const accessories = [
        { name: 'Dầu nhớt', type: '5', link: '2' },
        { name: 'Phanh xe', type: '6', link: '2' },
        { name: 'Gương', type: '7', link: '2' },
        { name: 'Bánh xe', type: '8', link: '2' },
    ];

    const isDisabled = !category;

    return (
        <select
            className="px-3 py-2 border rounded-md text-base italic"
            disabled={isDisabled}
            onChange={(e) => {
                console.log('Selected Value:', e.target.value); // This will show what's being passed
                onValueChange(e.target.value);
            }}
        >
            <option value="">-Chọn danh mục-</option>
            {category === 'motorbike' &&
                motorcycleBrands.map((brand) => (
                    <option key={brand.type} value={`${brand.link},${brand.type}`}>
                        {brand.name}
                    </option>
                ))}
            {category === 'accessories' &&
                accessories.map((part) => (
                    <option key={part.type} value={`${part.link},${part.type}`}>
                        {part.name}
                    </option>
                ))}
        </select>
    );
};

export default CategoryDropdown;
