import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { FaSearch } from 'react-icons/fa';
import { findProductsByName } from '@/pages/api/api';
import { debounce } from 'lodash';

function SearchBar() {
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();
    const modalRef = useRef();
    const inputRef = useRef();

    // Debounced search
    const debouncedSearch = debounce(async (query) => {
        if (query) {
            const response = await findProductsByName(0, 10, query);
            if (response.success && Array.isArray(response.data.productSomeReponseDtos)) {
                const filteredResults = response.data.productSomeReponseDtos.filter((product) =>
                    product.name.toLowerCase().includes(query.toLowerCase()),
                );
                setSearchResults(filteredResults);
                setShowModal(true);
            } else {
                setSearchResults([]);
                setShowModal(false);
            }
        } else {
            setSearchResults([]);
            setShowModal(false);
        }
    }, 300);

    useEffect(() => {
        if (search) {
            debouncedSearch(search);
        } else {
            setSearchResults([]);
            setShowModal(false);
        }
    }, [search]);

    // Close modal on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle input focus
    const handleInputFocus = () => {
        if (search && searchResults.length > 0) {
            setShowModal(true);
        }
    };

    // Handle search results click
    const handleResultsClick = (product) => {
        router.push(`/DetailProduct?id=${product.id}`);
        setShowModal(false);
    };

    return (
        <div className="relative flex w-full gap-2 md:w-max">
            {/* Search Bar */}
            <div className="relative h-10 w-full min-w-[30rem]">
                <input
                    ref={inputRef}
                    type="search"
                    className="h-full w-full rounded-[7px] border bg-white px-3 py-3.5 pr-16 font-sans text-sm font-normal placeholder:italic !text-black transition-all focus:outline-none disabled:bg-blue-gray-50"
                    placeholder="Tìm kiếm tên sản phẩm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={handleInputFocus}
                />
                <button
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 py-2 px-2 text-center align-middle font-sans font-bold uppercase transition-all hover:shadow-lg hover:shadow-blue-gray-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => debouncedSearch(search)}
                >
                    <FaSearch className="text-xl text-black" />
                </button>
            </div>

            {/* Modal Results */}
            {showModal && (
                <div
                    ref={modalRef}
                    className="absolute top-full mt-1 w-full bg-white shadow-lg z-10 max-h-[30rem] overflow-y-auto cursor-pointer"
                >
                    <ul>
                        {searchResults.map((product) => (
                            <li
                                key={product.id}
                                onClick={() => handleResultsClick(product)}
                                className="p-2 hover:bg-gray-100 text-black flex"
                            >
                                {/* Image */}
                                <img
                                    src={`data:image/jpeg;base64,${product.images[0]?.imgData}`}
                                    alt={product.name}
                                    className="mr-4 w-20 h-20 object-contain"
                                />
                                <div>
                                    {/* Products Name */}
                                    <div className="font-bold mb-1">{product.name}</div>
                                    <div className="text-sm flex justify-start items-center space-x-2 mb-1">
                                        {/* Products NewPrice */}
                                        <span className="text-[14px] font-bold text-[#FF0000]">
                                            {product.newPrice.toLocaleString()} VND
                                        </span>

                                        {/* Products OriginalPrice */}
                                        <span className="text-[14px] font-bold text-[#beb9b9] line-through">
                                            {product.originalPrice.toLocaleString()} VND
                                        </span>

                                        {/* Products Discount */}
                                        <span className="bg-[#2B92E4] text-white font-medium px-2 rounded">
                                            {product.discount} %
                                        </span>
                                    </div>
                                    <div className="text-xs">Hãng: {product.detailType}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
