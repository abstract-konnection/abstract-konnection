import axios from 'axios';
//action type
const GET_ORDERS = 'GET_ORDERS';
const CLOSE_ORDER = 'CLOSE_ORDER';

const _closeOrder = (cart) => ({
	type: CLOSE_ORDER,
	cart,
});


const getAllOrders = (orders) => ({
	type: GET_ORDERS,
	orders,
});

export const closeOrder = (userId) => {
	return async (dispatch) => {
		try {
			const token = window.localStorage.getItem('token');
			if (token) {
				const { data: updated } = await axios.put(
					`api/orders/users/${userId}`,
					{
						status: 'close',
					},
					{
						headers: {
							authorization: token,
						},
					}
				);
				dispatch(_closeOrder(updated));
				localStorage.removeItem('cartItems');
			} else {
				localStorage.removeItem('cartItems');
			}
		} catch (error) {
			console.log('Close order thunk: ', error);
		}
	};
};

export const fetchOrders = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/api/admin/orders');
			dispatch(getAllOrders(data));
		} catch (error) {
			console.log('Fetch All Orders thunk: ', error);
		}
	};
};

export default function ordersReducer(state = [], action) {
	switch (action.type) {
		case GET_ORDERS:
			return action.orders;
		case CLOSE_ORDER:
			return state.map(
				// eslint-disable-next-line no-confusing-arrow
				(order) => (order.id === action.order.id ? action.order : order)
			);
		default:
			return state;
	}
}
