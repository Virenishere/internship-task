import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchSuggestions, setSearchQuery } from '../redux/Actions';
import { useHistory } from 'react-router-dom'; // Import useHistory

const SearchBar = () => {
  const dispatch = useDispatch();
  const history = useHistory(); // Initialize useHistory
  const [query, setQuery] = useState('');
  const suggestions = useSelector((state) => state.products.searchSuggestions);
  const loading = useSelector((state) => state.products.loading);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (query.length > 2) {
      dispatch(fetchSearchSuggestions(query)); // Fetch suggestions when query length > 2
    }
  }, [dispatch, query]);

  // Handle search query input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    dispatch(setSearchQuery(value)); // Store the search query in Redux
  };

  // Handle suggestion click
  const handleSuggestionClick = (productName) => {
    setQuery(productName); // Set the query to the selected product
    dispatch(setSearchQuery(productName)); // Optionally update the Redux store
    // Navigate to the product details page (make sure this path matches your routing setup)
    history.push(`/product/${productName}`); 
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="p-2 border border-gray-300 rounded w-full"
      />
      {loading && <p className="text-gray-500">Loading suggestions...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded shadow-lg z-10">
          {suggestions.map((product) => (
            <li 
              key={product.id} 
              onClick={() => handleSuggestionClick(product.title)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
