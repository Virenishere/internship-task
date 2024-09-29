// src/redux/Actions.js

import axios from 'axios';

// Base URL for the API
const API_BASE_URL = 'https://dummyjson.com/products';

// Action types
export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const SET_PAGE = 'SET_PAGE';
export const SET_CATEGORY = 'SET_CATEGORY';
export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';




// Action to fetch products with pagination and category
export const fetchProducts = (page = 1, productsPerPage = 10, categorySlug) => {
    return async (dispatch) => {
        dispatch({ type: FETCH_PRODUCTS_REQUEST });

        try {
            console.log("Fetching products:", JSON.stringify({ page, productsPerPage, categorySlug }, null, 2));

            const validPage = Math.max(1, page);
            const skip = (validPage - 1) * productsPerPage;

            let url = `${API_BASE_URL}?limit=${productsPerPage}&skip=${skip}`;
            if (categorySlug) {
                const encodedCategory = encodeURIComponent(categorySlug);
                url = `${API_BASE_URL}/category/${encodedCategory}?limit=${productsPerPage}&skip=${skip}`;
            }

            const response = await axios.get(url);
            console.log("API Response:", response.data); // Log API response

            dispatch({
                type: FETCH_PRODUCTS_SUCCESS,
                payload: {
                    products: response.data.products,
                    totalProducts: response.data.total,
                },
            });
        } catch (error) {
            dispatch({ 
                type: FETCH_PRODUCTS_FAILURE, 
                payload: error.response?.data?.message || error.message 
            });
        }
    };
};


  


// Action to set the selected category and fetch products for the first page
export const setSelectedCategory = (categorySlug) => {
    return (dispatch) => {
      dispatch({
        type: SET_SELECTED_CATEGORY,
        payload: categorySlug,
      });
      // Set the page to 1 whenever the category changes
      dispatch(setPage(1));
      // Fetch products for the new category
      dispatch(fetchProducts(1, 10, categorySlug));
    };
  };


// Action creators for categories
export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: categories,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: error,
});

// Actions.jsx
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';

export const setSearchQuery = (query) => {
  return {
    type: SET_SEARCH_QUERY,
    payload: query,
  };
};

// Action to fetch categories using Axios
export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());
  try {
    const response = await axios.get("https://dummyjson.com/products/categories");

    // Assuming the API response is a simple array of categories
    dispatch(fetchCategoriesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching categories:", error); // Log any errors
    dispatch(fetchCategoriesFailure(error.response?.data?.message || error.message));
  }
};

// Action to set the current page
export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

// Action to set the current category
export const setCategory = (category) => ({
  type: SET_CATEGORY,
  payload: category,
});
