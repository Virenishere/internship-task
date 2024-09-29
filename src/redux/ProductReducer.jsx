// productReducer.js

const initialState = {
    products: [],
    loading: false,
    error: null,
    currentPage: 1,
    productsPerPage: 10,
    totalProducts: 0,
    selectedCategory: null, // Ensure selectedCategory is initialized
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            return {
                ...state,
                selectedCategory: action.payload,
                currentPage: 1, // Reset currentPage when category changes
            };
        case 'FETCH_PRODUCTS_REQUEST':
            return { ...state, loading: true, error: null };
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                totalProducts: action.payload.totalProducts,
                currentPage: action.payload.page,
            };
        case 'FETCH_PRODUCTS_FAILURE':
            return { ...state, loading: false, error: action.payload };
        case 'SET_PAGE':
            return { ...state, currentPage: action.payload };
        default:
            return state;
    }
};

// Selectors
export const selectProducts = (state) => state.products.products; // Ensure this matches your state shape
export const selectLoading = (state) => state.products.loading;
export const selectError = (state) => state.products.error;
export const selectCurrentPage = (state) => state.products.currentPage;
export const selectProductsPerPage = (state) => state.products.productsPerPage;
export const selectTotalProducts = (state) => state.products.totalProducts;
export const selectSelectedCategory = (state) => state.products.selectedCategory; // Added selector for selectedCategory

export default productReducer;
