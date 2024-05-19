import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { GoClockFill } from 'react-icons/go';

function Footer() {
    return (
        // Bao bọc toàn bộ nội dung hiện có và thêm vào phần mới
        <div className="bg-[#2B92E4]">
            <div className="py-8 px-4 sm:px-8 md:py-16 md:px-28 flex flex-wrap md:flex-nowrap justify-center">
                <ul className="w-full md:w-1/3 mb-8 md:mb-0">
                    <li className="text-white text-2xl pb-5">Danh mục các hãng</li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Honda</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Ducati</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Kawasaki</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Yamaha</a>
                    </li>
                </ul>

                <ul className="w-full md:w-1/3 mb-8 md:mb-0">
                    <li className="text-white text-2xl pb-5">Danh mục các trang</li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/">Trang Chủ</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Xe Máy</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Phụ Tùng</a>
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex">
                        <a href="/#">Dịch vụ</a>
                    </li>
                </ul>

                <ul className="w-full md:w-1/3">
                    <li className="text-white text-2xl pb-5">Liên hệ</li>
                    <li className="text-white text-base leading-8 pb-4 flex items-center">
                        <FaHome className="text-3xl mr-3" />
                        Đại Lộ Khoa Học, TP. Quy Nhơn
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex items-center">
                        <IoMdMail className="text-3xl mr-3" />
                        motobikes@gmail.com
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex items-center">
                        <FaPhoneAlt className="text-3xl mr-3" />
                        0123456789
                    </li>
                    <li className="text-white text-base leading-8 pb-4 flex items-center">
                        <GoClockFill className="text-3xl mr-3" />
                        <span>08:00 AM - 17:30 PM</span>
                    </li>
                </ul>
            </div>
            {/* Đường kẻ và dòng chữ mới */}
            <div className="px-4 sm:px-8 md:mx-20">
                <div className="border-t border-[#B2AFAF] text-white py-4 flex">
                    © 2024 Motorbike Ecommerce. Tất cả các quyền được bảo lưu.
                </div>
            </div>
        </div>
    );
}

export default Footer;
