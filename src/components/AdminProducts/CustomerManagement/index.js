import React, { useEffect, useState } from "react";
import RowUser from "../rowUser";
import { deleteUser, getAllUser, lockUser } from "@/pages/api/api";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
const CustomerManagerment = ({ }) => {
    const [dataUser, setDataUser] = useState([]);
    const [type, setType] = useState("2");
    const [search, setSearch] = useState("");
    const [curr, setCurr] = useState(0);
    const [totalPage, setTotalPage] = useState("");
    const [triggerUpdate, setTriggerUpdate] = useState(false);
    useEffect(() => {
        const data = localStorage.getItem("data");
        if (data) {
            setCarts(JSON.parse(data));
        }
        getAllUser(curr, 10, type).then((e) => {
            setDataUser(e.userDTOS)
            setTotalPage(e.totalPages)
            console.log(dataUser)
        });
    }, [curr, type, triggerUpdate]);


    const incre = () => {
        if (curr + 1 < totalPage) {
            setCurr(curr + 1);
        }
    };

    const decre = () => {
        setCurr(curr > 0 ? curr - 1 : 0);
    };

    // Function to handle product deletion
    const handleDeleteUser = async (idUser) => {
        const response = await deleteUser(idUser);
        if (response.success) {
            // Remove the deleted product from the state to update UI
            setDataUser(dataUser?.filter((user) => user.id != idUser));
            alert(response.message);
        } else {
            alert(response.message);
        }
    };
    const handleLockUser = async (idUser) => {
        const response = await lockUser(idUser);

        alert(response.message);
        setTriggerUpdate(prevState => !prevState);
    };

    return (
        <div>


            <div
                style={{ height: "100%" }}
                className="bg-white p-4 px-10 h-[calc(100vh-150px)]"
            >
                <header>
                    <h1 className="text-3xl font-bold text-center mb-4">
                        Quản lý khách hàng
                    </h1>
                </header>

                <div className="flex justify-between items-center mb-4">
                    {/* Sort */}
                    <div className="flex items-center">
                        <h2 className="mr-4">Tài khoản</h2>
                        <select
                            onChange={(e) => {
                                setType(e.target.value);
                            }}
                            className="px-3 py-2 border rounded-md mr-4"
                        >
                            <option value="2">User</option>
                            <option value="1">Admin</option>
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

                            <th className="border border-gray-300 px-4 py-2">Mã Khách hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Tài khoản</th>
                            <th className="border border-gray-300 px-4 py-2">Tên khách hàng</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Số điện thoại</th>
                            <th className="border border-gray-300 px-4 py-2">Địa chỉ</th>
                            <th className="border border-gray-300 px-4 py-2">Loại tài khoản</th>
                            <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
                            <th className="border border-gray-300 px-4 py-2">Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataUser &&
                            dataUser?.map((element) => (
                                <RowUser
                                    key={element.id}
                                    user={element}
                                    onDelete={handleDeleteUser}
                                    onLock={handleLockUser}
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
