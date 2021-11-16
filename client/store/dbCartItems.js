import axios from 'axios';
import { CLEAR_AFTER_LOGOUT } from '.';

const FETCH_OPEN_ORDER = 'FETCH_OPEN_ORDER';

const _fetchOpenCartItems = (orders) => ({
  type: FETCH_OPEN_ORDER,
  orders,
});

export const fetchOpenCartItems = (userId) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem('token');
      const { data: orders } = await axios.get(`/api/users/${userId}/cart`, {
        headers: {
          authorization: token,
        },
      });
      const orderWithProducts = orders.map((order) => {
        return {
          title: order.product.title,
          imageURL: order.product.imageURL,
          price: order.product.price,
          quantity: order.product.quantity,
          productId: order.product.id,
          qty: order.quantity,
        };
      });
      dispatch(_fetchOpenCartItems(orderWithProducts));
    } catch (err) {
      console.error('Could not fetch cart items', err);
    }
  };
};

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_OPEN_ORDER:
      return action.orders;
    case CLEAR_AFTER_LOGOUT:
      return [];
    default:
      return state;
  }
};
