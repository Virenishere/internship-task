import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

const Navbar = ({ search, setSearch }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch search suggestions from the API
  const fetchSearchSuggestions = async (query) => {
    if (query.length > 2) {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        setSuggestions(response.data.products || []); // Set suggestions from API response
      } catch (err) {
        setError('Failed to fetch suggestions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    } else {
      setSuggestions([]); // Clear suggestions if query length is <= 2
    }
  };

  // Handle search input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value); // Update the search state in the parent
    fetchSearchSuggestions(value); // Fetch suggestions based on input
  };

  // Handle suggestion click
  const handleSuggestionClick = (productName) => {
    setSearch(productName); // Set the query to the selected product
    setSuggestions([]); // Clear suggestions after selection
    performSearch(productName);
  };

  // Function to perform search action
  const performSearch = async (query) => {
    console.log(`Searching for: ${query}`);
  };

  return (
    <nav className="bg-blue-400 text-white p-4 flex items-center shadow-md relative">
      <h1 className='text-xl font-extrabold mr-auto'>ShoppingApp</h1>

      {/* Search Bar */}
      <div className='flex items-center border border-gray-500 rounded overflow-hidden mx-auto w-3/4 relative'>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          placeholder='Search Products...'
          className='p-2 rounded-l focus:outline-none text-black transition duration-300 ease-in-out hover:bg-gray-200 w-full' 
        />
        <button 
          className="p-3 bg-yellow-400 rounded-r flex items-center hover:bg-yellow-500 transition duration-300 ease-in-out" 
          onClick={() => performSearch(search)}
        >
          <FaSearch className="text-white" />
        </button>
      </div>

      {/* Suggestions Dropdown */}
      <div className="absolute w-3/4 mx-auto left-[1095px]  top-12 transform -translate-x-1/2 mt-2">
        {loading && <p className="bg-white text-black shadow-lg p-2 rounded z-20">Loading suggestions...</p>}
        {error && <p className="bg-red-500 text-white shadow-lg p-2 rounded z-20">{error}</p>}
        {suggestions.length > 0 && (
          <ul className="bg-white text-black rounded shadow-lg w-full z-30 max-h-60 overflow-auto">
            {suggestions.map((product) => (
              <li 
                key={product.id} 
                className="px-4 py-2 hover:bg-blue-500 hover:text-white transition duration-300 cursor-pointer"
                onClick={() => handleSuggestionClick(product.title)}
              >
                {product.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
