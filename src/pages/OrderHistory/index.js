import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io';
import {
    getAllCartOrder,
    approveTheOrder,
    cancelTheOrder,
    getCartByUserAndStatus
} from "@/pages/api/api";
import { FaTrash, FaPlus, FaSearch } from "react-icons/fa";

function OrderHistory() {
    const [carts, setCarts] = useState([]);
    const [totalPage, setTotalPage] = useState("");
    const [status, setStatus] = useState("4");
    const curr = 0;
    const incre = () => {
        if (curr + 1 < totalPage) {
            setCurr(curr + 1);
        }
    };
    const decre = () => {
        setCurr(curr > 0 ? curr - 1 : 0);
    };

    const [rating, setRating] = useState(0); // State lưu trữ số sao được chọn

    useEffect(() => {
        const cards = localStorage.getItem("cards");
        if (cards) {
            setCarts(JSON.parse(cards));
        }
        getCartByUserAndStatus(status).then((data) => {
            setCarts(data?.carts);
        });
    }, [status]);


    const renderStars = (numberStars, rating, setRating) => {
        const stars = [];
        for (let i = 1; i <= numberStars; i++) {
            if (i <= rating) {
                stars.push(<IoIosStar key={i} className="text-yellow-500 text-2xl" onClick={() => setRating(i)} />);
            } else {
                stars.push(<IoIosStarOutline key={i} className="text-yellow-500 text-2xl" onClick={() => setRating(i)} />);
            }
        }
        console.log("vote :" + rating)
        return stars;
    };


    return (
        <div>
            {/* Header */}

            <div
                style={{ height: "100%" }}
                className="bg-white p-4 px-10 h-[calc(100vh-150px)]"
            >
                <header>
                    <h1 className="text-3xl font-bold text-center mb-4">
                        Đơn hàng đã đặt
                    </h1>
                </header>

                <div className="flex justify-between items-center mb-8">
                    {/* Date Range Selector */}
                    <div className="flex items-center">
                        <label htmlFor="start_date" className="mr-2">
                            Từ ngày
                        </label>
                        <input
                            type="date"
                            id="start_date"
                            className="border rounded-md px-2 py-1 mr-2"
                            //  value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                        <label htmlFor="end_date" className="mr-2">
                            đến
                        </label>
                        <input
                            type="date"
                            id="end_date"
                            className="border rounded-md px-2 py-1 mr-2"
                        //  value={endDate}
                        //  onChange={(e) => setEndDate(e.target.value)}
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        // onClick={handleSearch}
                        >
                            Tìm
                        </button>
                        <button
                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2"
                        //  onClick={handleReset}
                        >
                            Đặt lại
                        </button>
                    </div>

                    {/* Order Status Selector */}
                    <div className="flex items-center">
                        <label htmlFor="order_status" className="mr-4">
                            Trạng thái đơn hàng
                        </label>
                        <select
                            id="order_status"
                            className="px-3 py-2 border rounded-md mr-4"
                            // value={orderStatus}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="4">Tất cả</option>
                            <option value="1">Đang chờ duyệt</option>
                            <option value="2">Thành công</option>
                            <option value="3">Đã hủy</option>
                        </select>

                        {/* Search bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm"
                                className="pl-4 pr-10 py-2 border rounded-md focus:outline-none italic"
                            //   value={searchQuery}
                            //  onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-600 px-3 py-2 rounded"
                            // onClick={handleSearch}
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </div>
                </div>

                <div style={{ overflowY: 'auto', maxHeight: '900px' }} >
                    {/* Table */}
                    <table className="w-full border-collapse border border-gray-300 text-center">
                        <thead>
                            <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                                <th className="border border-gray-300 px-4 py-2">Mã đơn hàng</th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Địa chỉ
                                </th>
                                <th className="border border-gray-300 px-4 py-2">Tên Sản Phẩm</th>
                                <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                                <th className="border border-gray-300 px-4 py-2">
                                    Thành tiền (VNĐ)
                                </th>
                                <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                                <th className="border border-gray-300 px-4 py-2">Thời gian</th>
                                <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                            </tr>
                        </thead>

                        <tbody>
                            {carts?.map((cart) => (
                                <React.Fragment key={cart.idCart}>
                                    {cart.shoppingCartDetailsDto.map((product, index) => (
                                        <tr
                                            key={`${cart.idCart}-${index}`}
                                            className="hover:bg-gray-100"
                                        >
                                            {index === 0 && (
                                                <React.Fragment>
                                                    <td
                                                        rowSpan={cart.shoppingCartDetailsDto.length}
                                                        className="border border-gray-300 px-4 py-2"
                                                    >
                                                        {cart.idCart}
                                                    </td>
                                                    {/* <td
                                                    rowSpan={cart.shoppingCartDetailsDto.length}
                                                    className="border border-gray-300 px-4 py-2"
                                                >
                                                    {cart.name}
                                                </td> */}
                                                    <td
                                                        rowSpan={cart.shoppingCartDetailsDto.length}
                                                        className="border border-gray-300 px-4 py-2"
                                                    >
                                                        {cart.address}
                                                    </td>
                                                    {/* <td
                                                    rowSpan={cart.shoppingCartDetailsDto.length}
                                                    className="border border-gray-300 px-4 py-2"
                                                >
                                                    {cart.numberPhone}
                                                </td> */}
                                                </React.Fragment>
                                            )}
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.productSomeReponseDto.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {product.quantityCart}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {(
                                                    product.quantityCart *
                                                    product.productSomeReponseDto.newPrice
                                                )
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                                                đ
                                            </td>

                                            <td className="border border-gray-300 px-4 py-2">
                                                <img
                                                    src={
                                                        "data:image/png;base64," +
                                                        product.productSomeReponseDto.images[0].imgData
                                                    }
                                                    alt={product.name}
                                                    style={{
                                                        width: "200px",
                                                        height: "100px",
                                                        objectFit: "contain",
                                                    }}
                                                />
                                            </td>

                                            {index === 0 && (
                                                <React.Fragment>
                                                    <td
                                                        rowSpan={cart.shoppingCartDetailsDto.length}
                                                        className="border border-gray-300 px-4 py-2"
                                                    >
                                                        {cart.paymentDate}
                                                    </td>
                                                    {
                                                        cart.status === 2 ? (
                                                            <td
                                                                rowSpan={cart.shoppingCartDetailsDto.length}
                                                                className="border border-gray-300 px-4 py-2  text-green-500"
                                                            >
                                                                Hoàng thành
                                                            </td>
                                                        ) : cart.status === 3 ? (
                                                            <td
                                                                rowSpan={cart.shoppingCartDetailsDto.length}
                                                                className="border border-gray-300 px-4 py-2  text-red-500"
                                                            >
                                                                Đơn hàng bị hủy
                                                            </td>
                                                        ) : (cart.status === 1 ? (
                                                            <td
                                                                rowSpan={cart.shoppingCartDetailsDto.length}
                                                                className="border border-gray-300 px-4 py-2  text-yellow-500"
                                                            >
                                                                Đang chờ duyệt
                                                            </td>) : <td
                                                                rowSpan={cart.shoppingCartDetailsDto.length}
                                                                className="border border-gray-300 px-4 py-2  text-white-500"
                                                            >
                                                            Đang trong giỏ hàng
                                                        </td>
                                                        )
                                                    }

                                                </React.Fragment>
                                            )}
                                        </tr>

                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>

                    </table>
                </div>

                <div className="flex items-center">
                    {renderStars(5, rating, setRating)}
                </div>

                <div
                    style={{
                        display: "flex",
                        marginTop: "10px",
                        marginLeft: "90%",
                        padding: "5px",
                        border: "1px solid black ",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <FaAngleLeft
                        onClick={decre}
                        style={{
                            border: "1px solid black ",
                            padding: "0 4px",
                            opacity: `${curr + 1 >= 1 ? "0.3" : "1"}`,
                        }}
                    />
                    <span style={{ padding: "0 4px", fontSize: "16px" }}>{curr + 1}</span>
                    <FaAngleRight
                        onClick={incre}
                        style={{
                            border: "1px solid black ",
                            padding: "0 4px",
                            opacity: `${curr + 1 < totalPage ? "1" : "0.3"}`,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default OrderHistory;
