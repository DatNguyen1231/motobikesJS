import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash, FaEdit, FaSearch } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import RowProduct from "../rowProduct";
import { getdataAdmin, getdataAdminSearch } from "@/pages/api/api";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { deleteProduct } from "@/pages/api/api";

const CustomerManagerment = ({ activeContent, changeContent }) => {
    const [dataProduct, setDataProduct] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [type, setType] = useState("1");
    const [search, setSearch] = useState("");
    const [curr, setCurr] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalPage, setTotalPage] = useState("");

    useEffect(() => {
        getdataAdmin(type, curr).then((e) => {
            setDataProduct(e.productSomeReponseDtos);
            setSelectAll(false);
            setTotalPage(e.totalPages);
        });
    }, []);

    // Handle select all
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const newSelectedProducts = dataProduct.map((product) => product.id);
            setSelectedProducts(newSelectedProducts);
        } else {
            setSelectedProducts([]);
        }
    };

    const handleSelectProduct = (id) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter((item) => item !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    useEffect(() => {
        if (search.length > 0) {
            getdataAdminSearch(curr, search).then((e) => {
                setTotalPage(e.totalPages);
                setDataProduct(e.productSomeReponseDtos);
            });
        } else {
            getdataAdmin(type, curr).then((e) => {
                setTotalPage(e.totalPages);
                setDataProduct(e.productSomeReponseDtos);
            });
        }
    }, [type, curr, search]);

    // useEffect(() => {
    //     const savedSelectedProducts = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    //     setSelectedProducts(savedSelectedProducts);

    //     if (search.length > 0) {
    //         getdataAdminSearch(curr, search)
    //             .then((e) => {
    //                 setTotalPage(e.totalPages)
    //                 setDataProduct(e.productSomeReponseDtos)
    //             })
    //     }
    //     else {
    //         getdataAdmin(type, curr)
    //             .then((e) => {
    //                 setTotalPage(e.totalPages)
    //                 setDataProduct(e.productSomeReponseDtos)
    //             })
    //     }
    // }, [selectedProducts, dataProduct]);

    const incre = () => {
        if (curr + 1 < totalPage) {
            setCurr(curr + 1);
        }
    };

    const decre = () => {
        setCurr(curr > 0 ? curr - 1 : 0);
    };

    // Get title
    const getTitle = () => {
        switch (activeContent) {
            case "products":
                return (
                    <span className="flex justify-center items-center font-thin text-xl">
                        Sản phẩm <MdKeyboardDoubleArrowRight className="mx-2 font-thin" />{" "}
                        Danh sách sản phẩm
                    </span>
                );
            case "addProduct":
                return (
                    <span>
                        Sản phẩm <MdKeyboardDoubleArrowRight className="mx-2 font-thin" />{" "}
                        Thêm sản phẩm
                    </span>
                );
            default:
                return "Sản phẩm";
        }
    };

    // Function to handle product deletion
    const handleDeleteProduct = async (productId) => {
        const response = await deleteProduct(productId);
        if (response.success) {
            // Remove the deleted product from the state to update UI
            setDataProduct(dataProduct.filter((product) => product.id !== productId));
            alert("Product deleted successfully");
        } else {
            alert("Failed to delete product: " + response.message);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2>{getTitle()}</h2>
            </div>
            <div
                style={{ height: "100%" }}
                className="bg-white p-4 px-10 h-[calc(100vh-150px)]"
            >
                <div className="flex justify-between items-center mb-4">
                    {/* Left-side buttons and dropdown */}
                    <div className="flex items-center">
                        <button
                            onClick={() => changeContent("addProduct")}
                            className="mr-4 flex items-center px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                        >
                            <FaPlus className="mr-1" /> Thêm danh mục
                        </button>
                        <button
                            //   onClick={handleDeleteSelectedProducts}
                            className="mr-4 flex items-center px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                            <FaTrash className="mr-1" /> Xoá tất cả
                        </button>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                    {/* Sort */}
                    <div className="flex items-center">
                        <h2 className="mr-4">Danh mục</h2>
                        <select
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                            className="px-3 py-2 border rounded-md mr-4"
                        >
                            <option value="1">Xe máy</option>
                            <option value="2">Phụ tùng</option>
                        </select>
                    </div>

                    {/* Search bar */}
                    <div className="flex items-center relative">
                        <input
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
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
                            <th className="border border-gray-300 px-4 py-2">
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="border border-gray-300 px-4 py-2">Mã Sản Phẩm</th>
                            <th className="border border-gray-300 px-4 py-2">Tên Sản Phẩm</th>
                            <th className="border border-gray-300 px-4 py-2">Ảnh</th>
                            <th className="border border-gray-300 px-4 py-2">Số lượng</th>
                            <th className="border border-gray-300 px-4 py-2">Tình trạng</th>
                            <th className="border border-gray-300 px-4 py-2">
                                Giá gốc (VNĐ)
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Phần trăm giảm giá (%)
                            </th>
                            <th className="border border-gray-300 px-4 py-2">
                                Giá giảm giá (VNĐ)
                            </th>
                            <th className="border border-gray-300 px-4 py-2">Danh mục</th>
                            <th className="border border-gray-300 px-4 py-2">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataProduct &&
                            dataProduct.map((element) => (
                                <RowProduct
                                    key={element.id}
                                    product={element}
                                    onDelete={handleDeleteProduct}
                                    onSelect={(id) => {
                                        setSelectedProduct(id);
                                        handleSelectProduct(id);
                                    }}
                                    isSelected={selectedProducts.includes(element.id)}
                                    changeContent={changeContent}
                                />
                            ))}
                    </tbody>
                </table>

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
};

export default CustomerManagerment;
