function ListProduct() {
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: '20%' }}></div>
            <div style={{ width: '80%' }}>
                <h1> Sản Phẩm Danh sách sản phẩm </h1>
                <div className="ListProduct-content">
                    <div className="ListProduct-content-head">
                        <button className="ListProduct-content-head-btn"> Thêm sản phẩm </button>
                        <button className="ListProduct-content-head-btn"> Xóa tất cả </button>
                    </div>
                    <div className="ListProduct-content-body">
                        <div className="ListProduct-content-body-head">
                            <div className="ListProduct-content-body-head-seclect">
                                <span> Danh mục : </span>
                                <select st>
                                    <option></option>
                                    <option>Xe máy</option>
                                    <option>Phụ tùng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListProduct;
