const axios = require('axios');

import { CLEAR_AFTER_LOGOUT } from '.';
const CREATE_OPEN_ORDER = 'CREATE_OPEN_ORDER';

const _createOpenOrder = (cart) => ({
  type: CREATE_OPEN_ORDER,
  cart,
});

export const populateOpenOrder = (order) => {
  return async (dispatch) => {
    try {
      //get cartItems currently in localStorage to populate open order
      const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];
      if (cartItems.length) {
        console.log(cartItems);
        const res = await Promise.all([
          cartItems.map((product) => {
            axios.post(`/api/cart/${order.id}/${product.product}`, {
              quantity: product.qty,
              totalPrice: product.price * Number(product.qty),
              orderId: order.id,
              productId: product.product,
            });
          }),
        ]);
        // const data = res.map((res) => res.data);
        dispatch(_createOpenOrder(order));
      }
    } catch (err) {
      console.error('Could not update cart', err);
    }
  };
};

export const createOpenOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data: order } = await axios.post(`api/orders/users/${userId}`);
      dispatch(populateOpenOrder(order));
    } catch (err) {
      console.error('Could not get an open order:', err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_OPEN_ORDER:
      //returning back open order, NOT the order_products table.
      return action.cart;
    case CLEAR_AFTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
