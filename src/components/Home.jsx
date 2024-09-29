import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductList from "./ProductList";
import CategorySelect from "./CategorySelect"; 
import { fetchCategories, fetchProducts, setSelectedCategory } from "../redux/Actions"; 
import { selectCategories, selectLoading, selectError } from "../redux/CategoriesReducer"; 
import { selectSelectedCategory } from "../redux/ProductReducer"; // Ensure this selector exists

const Home = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  
  const categories = useSelector(selectCategories);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  
  const selectedCategory = useSelector(selectSelectedCategory); // Get selected category from state
  const [currentPage, setCurrentPage] = useState(1);
  
  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Fetch products when category or page changes
  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchProducts(currentPage, 10, selectedCategory)); // Fetch products based on selected category and page
    }
  }, [dispatch, selectedCategory, currentPage]);

  // Handle category selection
  const handleCategorySelect = (categorySlug) => {
    dispatch(setSelectedCategory(categorySlug)); // Set selected category in state
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Navbar search={search} setSearch={setSearch} />
      {loading && <p>Loading categories...</p>}
      {error && <p>Error fetching categories: {error}</p>}
      
      {categories && categories.length > 0 ? (
        <CategorySelect categories={categories} onCategorySelect={handleCategorySelect} />
      ) : (
        <p>No categories available</p>
      )}
      
      <ProductList selectedCategory={selectedCategory} currentPage={currentPage} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
};

export default Home;
