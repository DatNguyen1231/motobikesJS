// import { useState, useEffect } from 'react';

// // useFetch now accepts an async function fetchDataFn
// function useFetch(fetchDataFn) {
//     const [data, setData] = useState(null);
//     const [fetching, setFetching] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 setFetching(true);
//                 const data = await fetchDataFn();
//                 setData(data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setFetching(false);
//             }
//         }

//         fetchData();
//     }, [fetchDataFn]);

//     return { data, fetching, error };
// }

// export default useFetch;
