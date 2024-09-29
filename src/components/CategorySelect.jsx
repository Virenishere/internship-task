import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, fetchCategories, setSelectedCategory } from "../redux/Actions"; // Import your actions

const CategorySelect = () => {
  const dispatch = useDispatch();
  
  // Selector to get categories, loading, and error from the Redux store
  const { categories, loading, error } = useSelector((state) => ({
    categories: state.categories.categories,
    loading: state.categories.loading,
    error: state.categories.error,
  }));

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (categorySlug) => {
    dispatch(setSelectedCategory(categorySlug)); // Set the selected category in Redux
    dispatch(fetchProducts(1, 10, categorySlug)); // Fetch products for the selected category
  };

  // Handle loading and error states
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error fetching categories: {error}</p>;

  return (
    <div className="flex flex-wrap justify-center space-x-4 mb-4">
      {categories.map((category) => (
        <button
          key={category.slug}
          onClick={() => handleCategoryChange(category.slug)} // Pass the category slug
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          disabled={loading} // Disable button while loading
        >
          {loading ? `Loading...` : category.name} {/* Change button text based on loading state */}
        </button>
      ))}
    </div>
  );
};

export default CategorySelect;
