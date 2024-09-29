import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setPage } from '../redux/Actions';
import {
    selectProducts,
    selectLoading,
    selectError,
    selectCurrentPage,
    selectProductsPerPage,
    selectTotalProducts,
    selectSelectedCategory,
} from '../redux/ProductReducer';
import ProductCard from './ProductCard';

const ProductList = ({ selectedCategory, currentPage, onPageChange }) => {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const productsPerPage = useSelector(selectProductsPerPage);
  const totalProducts = useSelector(selectTotalProducts);

  // Fetch products when the selected category or current page changes
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProducts(currentPage, productsPerPage, selectedCategory));
    }
  }, [dispatch, currentPage, productsPerPage, selectedCategory]);

  const totalPages = useMemo(() => Math.ceil(totalProducts / productsPerPage), [totalProducts, productsPerPage]);

  const handlePageChange = (page) => {
    onPageChange(page); // Notify Home component to change the current page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>

      {loading && <p className="text-blue-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && ( // Only show pagination if there are multiple pages
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              disabled={currentPage === index + 1}
              className={`mx-1 px-4 py-2 rounded ${
                currentPage === index + 1
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              } transition duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
