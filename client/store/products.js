import axios from 'axios';
//action type
const GET_PRODUCTS = 'GET_PRODUCTS';
const CREATE_PRODUCT = 'CREATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

//action creator
const getAllProducts = (products) => ({
	type: GET_PRODUCTS,
	products,
});

const updateProducts = (product) => {
	return {
		type: UPDATE_PRODUCT,
		product,
	};
};

const deleteProduct = (product) => {
	return {
		type: DELETE_PRODUCT,
		product,
	};
};

const createProduct = (product) => {
	return {
		type: CREATE_PRODUCT,
		product,
	};
};

export const fetchProductsAdmin = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/api/products/');
			dispatch(getAllProducts(data));
		} catch (error) {
			console.log('Fetch All Admin Products thunk: ', error);
		}
	};
};
//thunk
export const fetchProducts = (params) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(
				`/api/products/?page=${params.page}&size=${params.pageSize}`
			);
			dispatch(getAllProducts(data));
		} catch (error) {
			console.log('Fetch All Products thunk: ', error);
		}
	};
};

export const deleteProducts = (id) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { data: product } = await axios.delete(
					`/api/admin/products/${id}`,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(deleteProduct(product));
			}
		} catch (error) {
			console.log('Delete Products thunk: ', error);
		}
	};
};

export const updateProduct = (product) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { data: updated } = await axios.put(
					`/api/admin/products/${product.id}`,
					product,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(updateProducts(updated));
			}
		} catch (error) {
			console.log('Update Products thunk: ', error);
		}
	};
};

export const createProducts = (product) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { data: created } = await axios.post(
					'/api/admin/products',
					product,
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(createProduct(created));
			}
		} catch (error) {
			console.log('Create product thunk: ', error);
		}
	};
};

//reducer
export default function productsReducer(state = [], action) {
	switch (action.type) {
		case GET_PRODUCTS:
			return action.products;
		case CREATE_PRODUCT:
			return [...state, action.product];
		case DELETE_PRODUCT:
			return state.filter((product) => product.id !== action.product.id);
		case UPDATE_PRODUCT:
			return state.map(
				// eslint-disable-next-line no-confusing-arrow
				(product) =>
					product.id === action.product.id ? action.product : product
				// eslint-disable-next-line function-paren-newline
			);
		default:
			return state;
	}
}

// axios.get(`http://localhost:3333/blog/${anyvar}`)
// http://localhost:8080/api/products?page=1&size=12
