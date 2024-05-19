import React, { useState, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { getAllCartOrder,approveTheOrder,cancelTheOrder } from '@/pages/api/api';
import { FaTrash, FaPlus , FaSearch} from 'react-icons/fa';


function ApproveOrders () {
    const [carts, setCarts] = useState([]);

// mac dinh
    useEffect(() => {
       
        const cards = localStorage.getItem('cards');
        if (cards) {
            setCarts(JSON.parse(cards));
        }
        getAllCartOrder().then((data) => {
        setCarts(data?.carts);
    });
    }, []);

     // Function to handle product deletion

    const handleApproveOrder = async (idCart) => {
        try {
            const response = await approveTheOrder(idCart)
        
            // Update UI after approval if needed
            setCarts(carts.filter(cart =>cart.idCart !== idCart)); // Remove the approved cart from the list
        } catch (error) {
            console.error('Đã xảy ra lỗi khi duyệt đơn hàng!', error);
        }
    };

    const handleCancelOrder = async (idCart) => {
        try {
            const response = await cancelTheOrder(idCart)
        
            // Update UI after approval if needed
            setCarts(carts.filter(cart =>cart.idCart !== idCart)); // Remove the approved cart from the list
        } catch (error) {
            console.error('Đã xảy ra lỗi khi duyệt đơn hàng!', error);
        }
    };


    return (
        <div>
            {/* Header */}
          
            <div className="flex items-center justify-between mb-4">
                <h2>Duyệt đơn hàng</h2>
            </div>
            
            <div style={{ height: '100%' }} className="bg-white p-4 px-10 h-[calc(100vh-150px)]">
               
                 <div className="flex items-center">
                        <button
                           
                            className="mr-4 flex items-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            <FaPlus className="mr-1" /> Duyệt tất cả
                        </button>
                        <button
                            // onClick={handleDeleteSelectedProducts}
                            className="mr-4 flex items-center px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                            <FaTrash className="mr-1" /> Hủy tất cả
                        </button>
                </div>
                
                {/* Left-side buttons and dropdown */}
                <div className="flex justify-between items-center mb-4">
                    <div></div>

                    {/* Search bar */}
                    <div className="flex items-center relative">
                        <input
                           
                            className="pl-4 pr-3 py-2 border rounded-md focus:outline-none italic w-full"
                            placeholder="Tìm kiếm"
                        />
                        <FaSearch className="absolute right-3 text-gray-500" />
                    </div>
                </div>


                {/* Table */}
                <table className="w-full border-collapse border border-gray-300 text-center">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2"><input type='checkbox'></input></th>
                             <th className="border border-gray-300 px-4 py-2">Mã đơn hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Tài khoản</th>
                            <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                            <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                            <th className="border border-gray-300 px-4 py-2">Tên Sản Phẩm</th>
                            <th className="border border-gray-300 px-4 py-2">Số lượng</th>                          
                            <th className="border border-gray-300 px-4 py-2">Thành tiền (VNĐ)</th>
                            <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                            <th className="border border-gray-300 px-4 py-2">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carts.map((cart) => (
                            
                        <tr 
                            className="hover:bg-gray-100"
                            key={cart.idCart}
                        >
                             
                            <td className="border border-gray-300 px-4 py-2"><input type='checkbox'></input></td>
                            <td className="border border-gray-300 px-4 py-2"> {cart.idCart }</td> 
                            <td className="border border-gray-300 px-4 py-2"> {cart.name }</td>
                            <td className="border border-gray-300 px-4 py-2"> {cart.address }</td>
                            <td className="border border-gray-300 px-4 py-2"> {cart.numberPhone }</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {cart.shoppingCartDetailsDto.map((product) => (
                                    <div className="border border-gray-300 px-4 py-2">
                                        {product.productSomeReponseDto.name}
                                    </div> 
                                ))}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {cart.shoppingCartDetailsDto.map((product) => (
                                    <div>
                                      X  {product.quantityCart}
                                    </div>
                                ))}
                            </td> 
                             <td className="border border-gray-300 px-4 py-2">
                                {cart.shoppingCartDetailsDto.map((product) => (
                                    <div>
                                        {product.quantityCart*product.productSomeReponseDto.newPrice} đ
                                    </div>
                                ))}
                            </td>   
                            <td className="border border-gray-300 px-4 py-2">
                                {cart.shoppingCartDetailsDto.map((product) => (
                                    <div className="border border-gray-300 px-4 py-2">
                                       <img
                                            src={'data:image/png;base64,' + product.productSomeReponseDto.images[0].imgData}
                                            alt={product.name}
                                             style={{ width: '200px', height: '100px', objectFit: 'contain' }}/>
                                    </div>
                                ))}
                            </td> 
                               
                            <td  className="border border-gray-300 px-4 py-2">
                                <div  >
                                    <button
                                        type="button"
                                        class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                                        onClick={() => handleApproveOrder(cart.idCart)}
                                    > 
                                        Đuyệt đơn
                                    </button> 
                                        
                                    <button 
                                        type="button" 
                                        class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                         onClick={() => handleCancelOrder(cart.idCart)}
                                    >
                                        Hủy đơn
                                    </button>
                                </div>
                            </td>
                        </tr>
                        
                        
                        
                        ))} 
       
                    </tbody>
                </table>

                <div
                    style={{
                        display: 'flex',
                        marginTop: '10px',
                        marginLeft: '90%',
                        padding: '5px',
                        border: '1px solid black ',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                    }}
                >
                    
                  
                    <FaAngleRight
                 
                        style={{
                            border: '1px solid black ',
                            padding: '0 4px',
                         
                        }}
                    />
                </div>
            </div>
        </div>
    );
};


export default ApproveOrders;
