import FilterProduct from '../../components/FilterProduct';
import ProductCard from '../../components/cartProduct';
import { useEffect, useState } from 'react';
import { dataPageProduct } from '../api/api';
import { Pagination } from '@nextui-org/react';
import { useRouter } from 'next/router';

function ProductPage() {



    const [motorbikeProducts, setMotorbikeProducts] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, SetCurrentPage] = useState(0);
    const [apiFiter, setApiFiter] = useState(null);
    const [link, setLink] = useState("/product/get-by-id-type");
    const [sort, setSort] = useState('');
    const [type, setType] = useState('')
    const [totaleElement, setTotalElement] = useState('')



    const router = useRouter();
    const { typePage } = router.query;

    // filter
    useEffect(() => {
        productsData(link, currentPage, apiFiter || typePage, sort);
    }, [apiFiter, currentPage, sort, link]);

    const handlePageChange = async (index) => {
        const pageCondition = index <= 0 ? 0 : index - 1;
        SetCurrentPage(pageCondition);
    };

    useEffect(() => {
        productsData('/product/get-by-id-type', currentPage, typePage || 1);
        SetCurrentPage(0);
        setType(typePage);
        setLink('/product/get-by-id-type');
        setApiFiter(typePage)
    }, [typePage]);



    const productsData = async (link, currentPage, type, sort) => {
        try {
            const motorbikeData = await dataPageProduct(link, currentPage, type, sort);
            setMotorbikeProducts(motorbikeData.productSomeReponseDtos);
            setTotalPage(motorbikeData.totalPages);
            setTotalElement(motorbikeData.totalElements)
            return "sucsseful";
        } catch (error) {
            return "err";
        }
    };


    const handleArr = (e) => {
        switch (e.target.selectedIndex) {
            case 1:
                SetCurrentPage(0)
                setSort('ASC')
                break;

            case 2:
                SetCurrentPage(0)
                setSort('DESC')
                break;

            default:
                setSort('');
                SetCurrentPage(0);
                productsData(link, 0, typePage || 1);
        }
    };

    // mac dinh
    useEffect(() => {
        productsData(link, currentPage, typePage || 1);
        setType(typePage || 1);
    }, []);

    const filterMoto = [
        {
            name: 'Kawasaki',
            link: '1',
            type: '1',
        },
        {
            name: 'Ducati',
            link: '2',
            type: '1',
        },
        {
            name: 'Honda',
            link: '3',
            type: '1',
        },
        {
            name: 'Suziki',
            link: '4',
            type: '1',
        },
    ];

    const filterAccessary = [
        {
            name: 'Dầu nhớt',
            link: '5',
            type: '2',
        },
        {
            name: 'Phanh xe',
            link: '6',
            type: '2',
        },
        {
            name: 'Gương',
            link: '7',
            type: '2',
        },
        {
            name: 'Bánh xe',
            link: '8',
            type: '2',
        },
    ];


    return (
        <div className="ProductPage-container">
            <div className="ProductPage-name">
                <h6
                    style={{
                        position: 'absolute',
                        zIndex: '1',
                        backgroundColor: '#d9d9d9',
                        padding: '0px 20px',
                    }}
                >
                    {typePage ? (type == '1' ? 'Xe Máy' : 'Phụ Tùng') : 'Xe Máy'}
                </h6>
                <div className="ProductPage-line"></div>
            </div>
            <div className="ProductPage-total-filter">
                <div className="ProductPage-total">{totaleElement} Sản Phẩm </div>
                <div className="ProductPage-filter">
                    <span className="ProductPage-filter-name">Sắp xếp: </span>
                    <select
                        onChange={handleArr}
                        style={{
                            padding: '8px 0',
                            border: '1px solid black ',
                            borderRadius: '6px',
                        }}
                    >
                        <option> - Chọn tiêu chí - </option>
                        <option> Giá từ thấp đến cao </option>
                        <option> Giá từ cao đến thấp </option>
                    </select>
                </div>
            </div>

            <div className="ProductPage-content">
                <div className="ProductPage-content-filter">
                    <h1 className="ProductPage-content-filter-name"> Bộ Lọc </h1>
                    <FilterProduct
                        name={'Xe Máy'}
                        filter={filterMoto}
                        setApiFiter={setApiFiter}
                        SetCurrentPage={SetCurrentPage}
                        setLink={setLink}
                        setType={setType}
                    />
                    <FilterProduct
                        name={'Phụ Tùng'}
                        filter={filterAccessary}
                        setApiFiter={setApiFiter}
                        setLink={setLink}
                        SetCurrentPage={SetCurrentPage}
                        setType={setType}
                    />
                </div>

                <div className="ProductPage-content-main">
                    {motorbikeProducts &&
                        motorbikeProducts.map((product, index) => (
                            <div
                                key={product.id}
                                style={{
                                    width: '24.5%',
                                    margin: '0 2px 7px',
                                    overflow: 'hidden',
                                }}
                            >
                                <ProductCard style={{ width: '100%', margin: '0 2px' }} key={index} product={product} />
                            </div>
                        ))}
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            marginTop: '30px',
                            zIndex: '1',
                        }}
                    >
                        <Pagination
                            showControls
                            onChange={handlePageChange}
                            total={totalPage}
                            initialPage={1}
                            page={currentPage + 1}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
