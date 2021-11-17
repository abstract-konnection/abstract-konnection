const axios = require('axios');
const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

import { CLEAR_AFTER_LOGOUT } from '.';
const CREATE_OPEN_ORDER = 'CREATE_OPEN_ORDER';

const setAuth = (auth) => ({ type: SET_AUTH, auth });

const _createOpenOrder = (cart) => ({
  type: CREATE_OPEN_ORDER,
  cart,
});

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const populateOpenOrder = (order) => {
  return async (dispatch) => {
    try {
      //get cartItems currently in localStorage to populate open order
      const cartItems = localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [];

      if (cartItems.length) {
        const res = await Promise.all([
          cartItems.map((product) => {
            axios.post(`/api/cart/${order.id}/${product.productId}`, {
              quantity: product.qty,
              totalPrice: product.price * Number(product.qty),
              orderId: order.id,
              productId: product.productId,
            });
          }),
        ]);

        dispatch(_createOpenOrder(order));
        //remove the items on localStorage because items should be
        //populated in db now?
      } else {
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
      const token = localStorage.getItem('token');
      /* sending post data with user token on header to make sure 
      the right order is being matched with the right user */
      const { data: order } = await axios.post(
        `api/orders/users/${userId}`,
        {},
        {
          headers: {
            authorization: token,
          },
        }
      );
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
    //returning back open order, NOT the order_products table.
    case SET_AUTH:
      return {};
    case CLEAR_AFTER_LOGOUT:
      return {};
    default:
      return state;
  }
};
