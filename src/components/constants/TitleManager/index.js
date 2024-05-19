import React from 'react';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

const TitleManager = ({ activeContent }) => {
    const getTitle = () => {
        switch (activeContent) {
            case 'products':
                return (
                    <>
                        Sản phẩm <MdKeyboardDoubleArrowRight className="mx-2" /> Danh sách sản phẩm
                    </>
                );
            case 'addProduct':
                return (
                    <>
                        Sản phẩm <MdKeyboardDoubleArrowRight className="mx-2" /> Thêm sản phẩm
                    </>
                );
            case 'updateProduct':
                return (
                    <>
                        Sản phẩm <MdKeyboardDoubleArrowRight className="mx-2" /> Cập nhật sản phẩm
                    </>
                );
            default:
                return 'Sản phẩm';
        }
    };

    return (
        <h2 className="whitespace-nowrap overflow-hidden text-ellipsis flex items-center justify-center font-thin text-xl">
            {getTitle()}
        </h2>
    );
};

export default TitleManager;
