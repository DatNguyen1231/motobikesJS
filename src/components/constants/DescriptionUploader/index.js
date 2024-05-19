import React from 'react';

const DescriptionUploader = ({ description, setDescription }) => {
    return (
        <div className="flex flex-col items-start mb-4">
            <label className="block text-lg font-medium text-gray-700 mb-4">Nội dung</label>
            <textarea
                placeholder="Nhập mô tả..."
                className="w-full p-2 border rounded"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></textarea>
        </div>
    );
};

export default DescriptionUploader;
