// src/redux/CategoriesReducer.js
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    SET_SELECTED_CATEGORY, // Import the new action type
} from './Actions';

const initialState = {
    categories: [],
    loading: false,
    error: null,
    selectedCategory: null, // New state to track selected category
};

const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, loading: false, categories: action.payload };
        case FETCH_CATEGORIES_FAILURE:
            console.error("Error fetching categories:", action.payload); // Log the error
            return { ...state, loading: false, error: action.payload };
        case SET_SELECTED_CATEGORY: // Handle selected category action
            return { ...state, selectedCategory: action.payload }; // Update the selected category
        default:
            return state;
    }
};

// Selectors
export const selectCategories = (state) => state.categories.categories;
export const selectLoading = (state) => state.categories.loading;
export const selectError = (state) => state.categories.error;
export const selectSelectedCategory = (state) => state.categories.selectedCategory; // Selector for selected category

export default categoriesReducer;
