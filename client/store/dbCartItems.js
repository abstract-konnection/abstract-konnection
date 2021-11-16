import axios from 'axios';
import { CLEAR_AFTER_LOGOUT } from '.';

const FETCH_OPEN_ORDER = 'FETCH_OPEN_ORDER';

const _fetchOpenCartItems = (orders) => ({
  type: FETCH_OPEN_ORDER,
  orders,
});

export const fetchOpenCartItems = (orderId) => {
  return async (dispatch) => {
    try {
      /* we enter this when there isn't a cartItems arra on localStorage
    which hopefully means that we now have an open order and our items associated with
    that order in the db. Grab the items! */
      console.log('I AM IN FETCH OPEN CARTS!!!');
      const { data: orders } = await axios.get(`/api/cart/${orderId}`);
      dispatch(_fetchOpenCartItems(orders));
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
