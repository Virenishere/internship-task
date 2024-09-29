import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, setPage, setSelectedCategory } from "../redux/Actions";

const Pagination = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const totalProducts = useSelector((state) => state.products.totalProducts);
  const categories = useSelector((state) => state.categories.categories);
  const currentPage = useSelector((state) => state.products.currentPage);
  const selectedCategory = useSelector((state) => state.categories.selectedCategory);
  const productsPerPage = 10; // Adjust this number as needed

  const totalPages = Math.ceil(totalProducts / productsPerPage); // Calculate total pages

  useEffect(() => {
    dispatch(fetchCategories()); // Fetch categories when the component mounts
  }, [dispatch]);

  useEffect(() => {
    // Fetch products whenever the selected category or current page changes
    dispatch(fetchProducts(currentPage, productsPerPage, selectedCategory));
  }, [dispatch, currentPage, selectedCategory]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      dispatch(setPage(newPage)); // Set the current page in Redux state
      dispatch(fetchProducts(newPage, productsPerPage, selectedCategory)); // Fetch products for the new page
    }
  };

  const handleCategoryChange = (categorySlug) => {
    dispatch(setSelectedCategory(categorySlug)); // Set the selected category
    dispatch(setPage(1)); // Reset to the first page when changing categories
    dispatch(fetchProducts(1, productsPerPage, categorySlug)); // Fetch products for the first page of the new category
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index} onClick={() => handleCategoryChange(category.slug)}>
            {category.name}
          </li>
        ))}
      </ul>
      <h2>Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li> 
        ))}
      </ul>
      <div>
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} // Disable on first page
        >
          Previous
        </button>
        <span> Page {currentPage} of {totalPages} </span> {/* Display current page */}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} // Disable on last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
