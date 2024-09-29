// src/redux/Store.jsx
import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './CategoriesReducer'; // Adjust the path as needed
import productsReducer from './ProductReducer'; // If you have a products reducer

// Configure the Redux store
const Store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer, // Include your products reducer if applicable
  },
});

// Named export
export { Store }; // Exporting as a named export
