
import { useEffect, useRef, useState } from 'react';
import { paymentSuccess, addReviews } from '../api/api';
import { IoIosStar, IoIosStarOutline, IoIosStarHalf } from 'react-icons/io';
import { Button } from "@material-tailwind/react";
function OderSucc() {
    const [totalPrice, setTotalPrice] = useState('');
    const [dataProduct, setDataProduct] = useState([]);
    const [ratings, setRatings] = useState({}); // State lưu trữ đánh giá của từng sản phẩm
    //mac dinh
    useEffect(() => {
        paymentSuccess().then((data) => {
            setDataProduct(data?.shoppingCartDetailsDto);
            setTotalPrice(data?.totalPrice);
        });
    }, []);

    // Hàm xử lý sự kiện khi người dùng thay đổi đánh giá cho một sản phẩm
    const handleRatingChange = (productId, rating) => {
        setRatings(prevRatings => ({
            ...prevRatings,
            [productId]: rating
        }));

    };
    // Hàm render các biểu tượng sao dựa trên đánh giá của sản phẩm
    const renderStars = (productId, numberStars) => {
        const rating = ratings[productId] || 0; // Lấy đánh giá của sản phẩm, nếu không có thì mặc định là 0
        const stars = [];
        for (let i = 1; i <= numberStars; i++) {
            if (i <= rating) {
                stars.push(<IoIosStar key={i} className="text-yellow-500 text-2xl" onClick={() => handleRatingChange(productId, i)} />);
            } else {
                stars.push(<IoIosStarOutline key={i} className="text-yellow-500 text-2xl" onClick={() => handleRatingChange(productId, i)} />);
            }
        }
        return stars;
    };

    //send riviews
    const handleSendReview = async (idCartDetails) => {
        if (ratings[idCartDetails] === null || ratings[idCartDetails] === undefined) {
            alert("Vui lý chọn đánh giá");
            return;
        }
        const SendData = {
            idCartDetail: idCartDetails,
            rating: ratings[idCartDetails],
            comment: "đơn hàng tuyệt vời"
        }
        const response = await addReviews(SendData);
        alert(response.messenger);

    };

    return (
        <div className="oder-succ">
            <div className="ProductPage-name">
                <h6
                    style={{
                        position: 'absolute',
                        zIndex: '1',
                        backgroundColor: '#d9d9d9',
                        padding: '0px 20px',
                    }}
                >
                    Thanh toán
                </h6>
                <div className="ProductPage-line"></div>
            </div>
            <div className="oder-succ-container">
                <h3 className="oder-succ-container-name"> Đặt hàng thành công </h3>

                <div className="oder-succ-container-body">
                    <p className="oder-succ-container-body-name">Đơn đặt hàng của bạn gồm:</p>

                    <div className="hiden">
                        <table className="table-auto min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-base uppercase tracking-wider "
                                    >
                                        Ảnh
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider "
                                    >
                                        Tên sản phẩm
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider"
                                    >
                                        Giá
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider"
                                    >
                                        Số lượng
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider"
                                    >
                                        Tổng tiền
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider"
                                    >
                                        Đánh giá
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-center text-base uppercase tracking-wider"
                                    >
                                        Chức năng
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
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                {product.productSomeReponseDto.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                {product.productSomeReponseDto.newPrice
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                                VNĐ
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                {product.quantityCart}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                {(
                                                    product.quantityCart *
                                                    product.productSomeReponseDto.newPrice
                                                )
                                                    .toString()
                                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}{" "}
                                                VNĐ
                                            </td>
                                            <td>
                                                <div className="flex items-center">
                                                    {renderStars(product.id, 5)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-base">
                                                <Button
                                                    color="blue"
                                                    onClick={() => handleSendReview(product.id)}
                                                >

                                                    Gửi
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="oder-succ-container-body-pay">
                        <div className="oder-succ-container-body-pay-total">
                            <p className="oder-succ-container-body-pay-total-name">Tổng giá tiền</p>
                            <p className="oder-succ-container-body-pay-total-name oder-succ-container-body-pay-total-price">
                                {totalPrice && totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VND
                            </p>
                        </div>

                        <div className="oder-succ-container-body-pay-total">
                            <p className="oder-succ-container-body-pay-total-name">Phương thức thanh toán</p>
                            <p className="oder-succ-container-body-pay-total-name">Thanh toán tại shop</p>
                        </div>
                    </div>

                    <p className="oder-succ-container-body-footer">
                        Cảm ơn anh chị đã mua hàng tại: Motobike Ecommerce. Anh chị vui lòng đến cửa hàng nhận xe và
                        thanh toán nhé.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default OderSucc;
