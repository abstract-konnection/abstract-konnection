import axios from 'axios';

const initialState = {
	cartItems: localStorage.getItem('cartItems')
		? JSON.parse(localStorage.getItem('cartItems'))
		: [],
};

export const ADD_CART_ITEM = 'ADD_CART_ITEM';

const addCartItem = (product, qty) => {
	return {
		type: ADD_CART_ITEM,
		payload: {
			title: product.title,
			imageURL: product.imageURL,
			price: product.price,
			quantity: product.quantity,
			product: product.id,
			qty,
		},
	};
};

export const addCartItems = (id, qty) => {
	return async (dispatch, getState) => {
		try {
			const { data } = await axios.get(`/api/products/${id}`);
			dispatch(addCartItem(data, qty));
			localStorage.setItem(
				'cartItems',
				JSON.stringify(getState().cartItem.cartItems)
			);
		} catch (error) {
			console.log('Add to cart thunk:', error);
		}
	};
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_CART_ITEM:
			const item = action.payload;
			const existingItem = state.cartItems.find(
				(e) => e.product === item.product
			);
			if (existingItem) {
				return {
					...state,
					cartItems: state.cartItems.map((e) =>
						e.product === existingItem.product ? item : e
					),
				};
			} else {
				return { ...state, cartItems: [...state.cartItems, item] };
			}
		default:
			return state;
	}
};
