import React, { useState, useEffect } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import {
  getAllCartOrder,
  approveTheOrder,
  cancelTheOrder,
  getAllRevenueCart,
} from "@/pages/api/api";
import { FaTrash, FaPlus, FaSearch } from "react-icons/fa";
import * as XLSX from "xlsx";
function RevenueStatistics() {
  const [carts, setCarts] = useState([]);
  const [status, setStatus] = useState("4");
  const [firstDay, setFirstDay] = useState("1000-1-1");
  const [lastDay, setLastDay] = useState("3000-1-1");

  //đang chờ duyệt
  // mac dinh
  useEffect(() => {
    const cards = localStorage.getItem("cards");
    if (cards) {
      setCarts(JSON.parse(cards));
    }
    getAllRevenueCart(firstDay, lastDay, status).then((data) => {
      setCarts(data?.carts);
    });
  }, [status]);


  const allOrders = carts.totalOrder;
  // Đếm số đơn hàng thành công
  const successfulOrders = carts.successfulOrder;

  // Đếm số đơn hàng bị hủy
  const canceledOrders = carts.cancelledOrder;


  function formatCurrency(amount, locale, currency) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(amount);
  }
  const totalIncome = formatCurrency(carts?.sumRevenue, 'vi-VN', 'VND');



  // Function to handle product deletion

  const handleRevenueCart = async () => {
    try {
      const response = await getAllRevenueCart(firstDay, lastDay, status);
      setCarts(response?.carts);
    } catch (error) {
      console.error("Đã xảy ra lỗi khi duyệt đơn hàng!", error);
    }
  };

  // Hàm xử lý sự kiện khi người dùng nhấp vào nút "Xuất ra Excel"
  const exportToExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById("revenue-table"));
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bảng Doanh Thu");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    const url = window.URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'doanh-thu.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const handleCancelOrder = async (idCart) => {
    try {
      const response = await cancelTheOrder(idCart);

      // Update UI after approval if needed
      setCarts(carts.filter((cart) => cart.idCart !== idCart)); // Remove the approved cart from the list
    } catch (error) {
      console.error("Đã xảy ra lỗi khi duyệt đơn hàng!", error);
    }
  };


  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <header>
        <h1 className="text-3xl font-bold text-center mb-4">
          Báo cáo doanh thu
        </h1>
      </header>
      {/* input */}

      <div className="mb-4 flex items-center">
        <span className="mr-2">Từ ngày</span>
        <input
          type="date"
          className="border rounded-md px-2 py-1 mr-2"
          value={firstDay}
          onChange={(e) => setFirstDay(e.target.value)}
        />
        <span className="mr-2">đến</span>
        <input
          type="date"
          className="border rounded-md px-2 py-1 mr-2"
          value={lastDay}
          onChange={(e) => setLastDay(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRevenueCart}
        >
          Tìm
        </button>
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            console.log("Button clicked"); // In ra dòng này để xác nhận rằng sự kiện onClick đã được kích hoạt
            setStatus(4);
          }}>
          hủy
        </button>
      </div>

      {/* Sort */}
      <div className="mb-4 flex items-center">
        <h2 className="mr-4">Trạng thái</h2>
        <select
          onChange={(e) => {
            setStatus(e.target.value);
          }}
          className="px-3 py-2 border rounded-md mr-4"
        >
          <option value="4">Tất cả</option>
          <option value="2">Đơn hàng thành công</option>
          <option value="3">Đơn hàng bị hủy</option>
        </select>
      </div>

      <div>
        {/* Các phần còn lại của component */}


      </div>
      <div className=" mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 ">
        <div className="bg-gray-100 rounded-md p-4 text-center">
          <i className="fas fa-box text-2xl mb-2"></i>
          <p className="text-lg">Tổng Số đơn</p>
          <h2 className="text-2xl">{allOrders}</h2>
        </div>
        <div className="bg-gray-100 rounded-md p-4 text-center">
          <i className="fas fa-dollar-sign text-2xl mb-2"></i>
          <p className="text-lg text-green-500">Đơn thành công</p>
          <h2 className="text-2xl">{successfulOrders}</h2>
        </div>
        <div className="bg-gray-100 rounded-md p-4 text-center">
          <i className="fas fa-dollar-sign text-2xl mb-2"></i>
          <p className="text-lg text-red-500">Đơn hàng bị hủy</p>
          <h2 className="text-2xl">{canceledOrders}</h2>
        </div>
        <div className="bg-gray-100 rounded-md p-4 text-center">
          <i className="fas fa-dollar-sign text-2xl mb-2"></i>
          <p className="text-lg text-pink-500">Doanh thu</p>
          <h2 className="text-2xl">{totalIncome}</h2>
        </div>
      </div>

      {/* Nút "Xuất ra Excel" */}
      <div className="mb-4 flex items-center">
        <button
          className="mr-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={exportToExcel}
        >
          In doanh thu
        </button>
      </div>


      {/* Table */}
      <div className="container mx-auto p-4 bg-gray-50 ">
        <div>Chi tiết</div>
        <table id="revenue-table" className="w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="text-md font-semibold tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
              <th className="border border-gray-300 px-4 py-2">Mã sản phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Tên Sản Phẩm</th>
              <th className="border border-gray-300 px-4 py-2">Số lượng bán ra</th>
              <th className="border border-gray-300 px-4 py-2">Thành tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {carts.detailRevenueProduct?.map((item, index) => (
              <tr key={index} className="text-md font-normal tracking-wide text-center text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                <td className="border border-gray-300 px-4 py-2">{item.idProduct}</td>
                <td className="border border-gray-300 px-4 py-2">{item.nameProduct}</td>
                <td className="border border-gray-300 px-4 py-2">{item.quantityOrder}</td>
                <td className="border border-gray-300 px-4 py-2">{formatCurrency(item.totalMoney, 'vi-VN', 'VND')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
}

export default RevenueStatistics;
