import axios from 'axios';

const SET_PRODUCT = 'SET_PRODUCT';

export const initialState = {
	products: [],
	product: {},
};

const setProduct = (product) => {
	return {
		type: SET_PRODUCT,
		product,
	};
};

export const setProducts = (id) => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get(`/api/products/${id}`);
			dispatch(setProduct(data));
		} catch (error) {
			console.log('Set products thunk:', error);
		}
	};
};

export default function productReducer(state = initialState, action) {
	switch (action.type) {
		case SET_PRODUCT:
			return action.product;
		default:
			return state;
	}
}
