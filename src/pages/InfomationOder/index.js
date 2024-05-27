
import { FaAddressCard } from "react-icons/fa";
import { getByCartUserPayment, getUserInfo } from "../api/api";
import { useEffect, useState } from "react";
import { payment } from "../api/api";
import Link from "next/link";
import { useRouter } from "next/router";

function InfomationOder() {
    const router = useRouter();
    const [dataProduct, setDataProduct] = useState([]);
    const [user, setUser] = useState({});
    const [totalPrice, setTotalPrice] = useState("");
    const [userData, setUserData] = useState({
        name: "",
        numberPhone: "",
        email: "",
        address: "",
    });
    // mac dinh
    useEffect(() => {
        const storedUserInfo = localStorage.getItem("userInfo");
        if (storedUserInfo) {
            setUser(JSON.parse(storedUserInfo));
        }

        getByCartUserPayment().then((data) => {
            setUserData(data);
            setDataProduct(data?.shoppingCartDetailsDto);
            setTotalPrice(data?.totalPrice);
        });

        getByCartUserPayment();
    }, []);

    const handlePayment = () => {
        payment()
            .then((response) => {
                if (response.success) {
                    router.push("/oderSucc");
                } else {
                    console.error("Payment failed:", response.message);
                }
            })
            .catch((error) => {
                console.error("Payment error:", error);
            });
    };

    return (
        <div className="informationOder">
            <div className="ProductPage-name">
                <h6
                    style={{
                        position: "absolute",
                        zIndex: "1",
                        backgroundColor: "#d9d9d9",
                        padding: "0px 20px",
                    }}
                >
                    Thanh toán
                </h6>
                <div className="ProductPage-line"></div>
            </div>

            <div className="informationOder-infor-container">
                <div className="informationOder-infor-container-head">
                    <FaAddressCard style={{ fontSize: "30px" }} />
                    <h3 style={{ paddingLeft: "8px", fontWeight: "800" }}>
                        Thông tin khách hàng
                    </h3>
                </div>

                <div className="informationOder-infor-container-body">
                    <p className="informationOder-infor-container-body-name text-lg ">
                        <b>Họ và Tên:</b> {userData.name}
                    </p>
                    <p className="informationOder-infor-container-body-name text-lg ">
                        <b>Số điện thoại:</b> {userData.numberPhone}
                    </p>
                    <p className="informationOder-infor-container-body-name text-lg ">
                        <b>Email:</b> {userData.email}
                    </p>
                    <p className="informationOder-infor-container-body-name text-lg ">
                        <b>Địa chỉ:</b> {userData.address}
                    </p>
                </div>
            </div>

            <div className="informationOder-product-container">
                <div className="hiden">
                    <table className="table-auto min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-lg uppercase tracking-wider "
                                >
                                    Ảnh
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-lg uppercase tracking-wider "
                                >
                                    Tên sản phẩm
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                    Giá
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                    Số lượng
                                </th>
                                <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-lg uppercase tracking-wider"
                                >
                                    Tổng tiền
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {dataProduct?.map((product) => {
                                return (
                                    <tr key={product.productSomeReponseDto.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">

                                                <img
                                                    className=" h-24 w-230 object-cover object-center"
                                                    src={
                                                        "data:image/png;base64," +
                                                        product.productSomeReponseDto.images[0].imgData
                                                    }
                                                    alt="Product"
                                                />

                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-lg">
                                            {product.productSomeReponseDto.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-lg">
                                            {product.productSomeReponseDto.newPrice
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                            VNĐ
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-lg">
                                            {product.quantityCart}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center text-lg">
                                            {(
                                                product.quantityCart *
                                                product.productSomeReponseDto.newPrice
                                            )
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                            VNĐ
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
                <div className="informationOder-product-container-total-price">
                    <p className="informationOder-product-container-total-price_name text-lg">
                        Tổng cộng
                    </p>
                    <p className="informationOder-product-container-total-price_price">
                        {totalPrice &&
                            totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                        VND
                    </p>
                </div>

                <div className="informationOder-product-container-payment">
                    <div className="informationOder-product-container-payment-name"></div>

                    <Link href={"/oderSucc"}>
                        <button
                            style={{
                                padding: " 10px 20px",
                                color: "white",
                                backgroundColor: "#2B92E4",
                                borderRadius: "3px",
                            }}
                            onClick={handlePayment}
                        >
                            Thanh toán
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
export default InfomationOder;
