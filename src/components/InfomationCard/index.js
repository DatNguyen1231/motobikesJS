function InfomationCard({ product }) {
    const total = product.quantityCart * product.productSomeReponseDto.newPrice;
    const price = product.productSomeReponseDto.newPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return (
        <div className="InfomationCard">
            <img
                className="InfomationCard-img"
                src={'data:image/png;base64,' + product.productSomeReponseDto.images[0].imgData}
            />
            <h3 className="InfomationCard-brand"> {product.productSomeReponseDto.name} </h3>
            <p className="InfomationCard-price"> {price} VNĐ </p>
            <p style={{ width: '5%' }}> x </p>
            <p style={{ width: '5%', marginLeft: '5%' }}> {product.quantityCart} </p>
            <p className="InfomationCard-totalPrice"> {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} VNĐ </p>
        </div>
    );
}

export default InfomationCard;
