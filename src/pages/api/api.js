import axiosInstance from './axios';
import axios from 'axios';

// Handle Login
export const auth_login = async (username, password) => {
    const loginInfo = { username, password };

    try {
        const response = await axiosInstance.post('/authenticate', loginInfo);
        const data = response.data;

        if (response.status === 200) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userInfo', JSON.stringify(data.userDTO));

            return { success: true, data };
        } else {
            return { success: false, messenger: data.messenger };
        }
    } catch (error) {
        return {
            success: false,
            messenger: error.response ? error.response.data.messenger : error.messenger,
        };
    }
};

// Handle Register
export const setRegisterData = async (data) => {
    try {
        const response = await axiosInstance.post('/register', data);
        return response;
    } catch (error) {
        return {
            success: false,
            messenger: error.response ? error.response.data.messenger : error.messenger,
        };
    }
};

// Forgot Password
export const ForgotPassword = async (email) => {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('email', email);

    try {
        const response = await axiosInstance.post('/otp/otp', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // If success return true
        if (response.status === 200) {
            return true;
        }
        return false;
    } catch (error) {
        throw new Error(error.response ? error.response.data.messenger : 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
};

// Confirm OTP
export const ConfirmOTP = async (email, otp) => {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('otp', otp);

    try {
        // Send request
        const response = await axiosInstance.post('/otp/reset-password', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        // Handle response
    } catch (error) {
        throw new Error(error.response ? error.response.data.messenger : 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
};
// Motorbike Products API
export const MotorbikeData = async () => {
    const pageNumber = 0;
    const pageSize = 4;
    const sortBy = 1;

    try {
        const response = await axiosInstance.get(`/product/get-by-id-type/${pageNumber}/${pageSize}/${sortBy}`);
        const data = response.data;
        const products = data.productSomeReponseDtos;

        return products;
    } catch (error) {
        return [];
    }
};

// Accessories Products API
export const AccessoriesData = async () => {
    const pageNumber = 0;
    const pageSize = 4;
    const sortBy = 2;

    try {
        const response = await axiosInstance.get(`/product/get-by-id-type/${pageNumber}/${pageSize}/${sortBy}`);
        const data = response.data;
        const products = data.productSomeReponseDtos;

        return products;
    } catch (error) {
        return [];
    }
};

// Detail Product API
export const DetailProductData = async (id) => {
    try {
        const response = await axiosInstance.get(`/product/get-detail/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch product details: ' + error.message);
    }
};

// Get Reviews Data by Product ID
export const ReviewsData = async (productId) => {
    try {
        const response = await axiosInstance.get(`/reviews/get/${productId}`);
        return response.data;
    } catch (error) {
        return null;
    }
};
// data page product
export const dataPageProduct = async (link, currentPage, type, sort) => {
    try {
        const response = await axiosInstance.get(`${link}/${currentPage}/${12}/${type}${sort ? `/${sort}` : ''}`);
        const data = response.data;
        // const products = data.productSomeReponseDtos;
        // return products;
        return data;
    } catch (error) {
        return [];
    }
};

// Add product to user's cart
export const addToCart = async (productId, quantity) => {
    const cartData = {
        idProduct: productId,
        quantityCart: quantity,
    };

    try {
        const response = await axiosInstance.post('user/shopping-cart/add-to-cart', cartData, {});

        return {
            data: response.data,
        };
    } catch (error) {
        return {
            message: error.response ? error.response.data.message : 'An error occurred',
        };
    }
};

// Get the cart for the logged-in user
export const getCartByUser = async () => {
    try {
        const response = await axiosInstance.post('/user/shopping-cart/get-cart-by-user', {});
        return {
            success: true,
            cart: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'An error occurred',
        };
    }
};

export const getAllCartOrder = async (status) => {
    try {
        const response = await axiosInstance.post(`/user/shopping-cart/get-all-oder/${status}`, {});
        return {
            success: true,
            carts: response.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'An error occurred',
        };
    }
};

// Confirm OTP
export const getAllRevenueCart = async (firstDay, lastDay, status) => {
    // Create form data
    const formData = new URLSearchParams();
    formData.append('firstDay', firstDay);
    formData.append('lastDay', lastDay);
    formData.append('status', status);

    try {
        // Send request
        const response = await axiosInstance.post('/user/shopping-cart/get-revenue-by-day', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log(response.data);
        return { carts: response.data };
        // Handle response
    } catch (error) {
        throw new Error(error.response ? error.response.data.messenger : 'Có lỗi xảy ra, vui lòng thử lại sau.');
    }
};


// send token to server
export const getByCartUserPayment = async () => {
    try {
        const response = await axiosInstance.post('/user/shopping-cart/get-cart-by-user', {});
        return response.data;
    } catch (error) {
        return [];
    }
};

// send token to server
export const paymentSuccess = async () => {
    try {
        const response = await axiosInstance.post('/user/shopping-cart/get-cart-by-user-paid', {});
        return response.data;
    } catch (error) {
        return [];
    }
};

// getdata Admin
export const getdataAdmin = async (type, curr) => {
    try {
        const response = await axiosInstance.get(`/product/get-by-id-type/${curr || 0}/12/${type}`);
        const data = response.data;
        return data;
    } catch (error) {
        return [];
    }
};

// Add Product
export const addProduct = async (productData) => {
    try {
        const response = await axiosInstance.post('/admin/product/add', productData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200 || response.status === 201) {
            return {
                success: true,
                data: response.data,
                message: 'Sản phẩm đã được thêm thành công!',
            };
        } else {
            return {
                success: false,
                message: response.data.message || 'Không thể thêm sản phẩm!',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'Đã xảy ra lỗi khi thêm sản phẩm!',
        };
    }
};

// Delete Product
export const deleteProduct = async (productId) => {
    try {
        const response = await axiosInstance.delete(`/admin/product/delete/${productId}`);
        if (response.status === 200 || response.status === 204) {
            return {
                success: true,
                message: 'Xoá sản phẩm thành công!',
            };
        } else {
            return {
                success: false,
                message: 'Không thể xoá sản phẩm!',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'Đã xảy ra lỗi khi xoá sản phẩm!',
        };
    }
};

// Update Product
export const updateProduct = async (productId, productData) => {
    try {
        const response = await axiosInstance.put(`/admin/product/put/${productId}`, productData, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response;
    } catch (error) {
        console.error('Error updating product:', error.response ? error.response.data : error.message);
        return {
            success: false,
            status: error.response ? error.response.status : 500, // Default to status 500 on error
            message: (error.response && error.response.data && error.response.data.message) || 'Unknown error',
        };
    }
};

//search admin
export const getdataAdminSearch = async (curr, valueSearch) => {
    try {
        const response = await axiosInstance.get(`/product/find-by-name-product/${curr}/12/${valueSearch}`);
        const data = response.data;
        return data || [];
    } catch (error) {
        return [];
    }
};

// Update Customer Information
export const updateUserAccount = async (customerInfo) => {
    try {
        const response = await axiosInstance.post('/change-customer-information', customerInfo);
        if (response.status === 200) {
            return {
                success: true,
                message: 'Thông tin đã được cập nhật thành công!',
                data: response.data,
            };
        } else {
            return {
                success: false,
                message: 'Cập nhật thông tin không thành công!',
                errorDetails: response.data,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin!',
            errorDetails: error.response ? error.response.data : 'Không thể kết nối tới server',
        };
    }
};

// Update Customer Information

export const payment = async (paymentData) => {
    try {
        const response = await axiosInstance.post('/user/shopping-cart/payment', paymentData);

        if (response.status === 200) {
            return {
                success: true,
                message: 'Thanh toán thành công!',
                data: response.data,
            };
        } else if (response.status >= 400 && response.status < 500) {
            return {
                success: false,
                message: 'Lỗi từ phía người dùng!',
                errorDetails: response.data,
            };
        } else if (response.status >= 500) {
            return {
                success: false,
                message: 'Lỗi từ phía server!',
                errorDetails: response.data,
            };
        } else {
            return {
                success: false,
                message: 'Thanh toán không thành công!',
                errorDetails: response.data,
            };
        }
    } catch (error) {
        return {
            success: false,
            message: 'Đã xảy ra lỗi khi cập nhật thông tin!',
            errorDetails: error.response ? error.response.data : 'Không thể kết nối tới server',
        };
    }
};

//duyệt đơn
export const approveTheOrder = async (idCart) => {
    try {
        const response = await axiosInstance.post(`/user/shopping-cart/approve-the-order/${idCart}`);

        console.log(response);
        return {
            data: response.data,
        };
    } catch (error) {
        return {
            message: error.response ? error.response.data.message : 'Đã xảy ra lỗi khi xoá sản phẩm!',
        };
    }
};

//huy điwb
export const cancelTheOrder = async (idCart) => {
    try {
        const response = await axiosInstance.post(`/user/shopping-cart/cancel-the-order/${idCart}`);

        console.log(response);
        return {
            data: response.data,
        };
    } catch (error) {
        return {
            message: error.response ? error.response.data.message : 'Đã xảy ra lỗi khi xoá sản phẩm!',
        };
    }
};
// Function to search products by name
export const findProductsByName = async (page, size, nameProduct) => {
    try {
        const response = await axiosInstance.get(
            `/product/find-by-name-product/${page}/${size}/${encodeURIComponent(nameProduct)}`,
        );
        if (response.status === 200) {
            return {
                success: true,
                data: response.data,
            };
        } else {
            return {
                success: false,
                message: 'Request completed, but with a non-success status code.',
            };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'An error occurred while trying to fetch the data.',
        };
    }
};

// Handle Get Information User
export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get('/get-information-user');
        const data = response.data;

        if (response.status === 200) {
            return { success: true, data };
        } else {
            return { success: false, message: data.message };
        }
    } catch (error) {
        return {
            success: false,
            message: error.response ? error.response.data.message : 'Failed to fetch user information.',
        };
    }
};

// Handle Change Password
export const changePassword = async (data) => {
    const params = new URLSearchParams({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        enterPassword: data.enterPassword,
    }).toString();

    try {
        const response = await axiosInstance.post(`/change-password?${params}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
