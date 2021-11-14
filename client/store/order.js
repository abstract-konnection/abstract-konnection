const axios = require('axios');

//get cartItems currently in localStorage to populate open order
const cartItems = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const CREATE_OPEN_ORDER = 'CREATE_OPEN_ORDER';

const _createOpenOrder = (cart) => ({
  type: CREATE_OPEN_ORDER,
  cart,
});

export const populateOpenOrder = (order, cartItems) => {
  return async (dispatch) => {
    try {
      if (cartItems.length) {
        await Promise.all([
          cartItems.map((product) => {
            axios.post(`/api/cart/${order.id}/${product.product}`, {
              quantity: product.qty,
              totalPrice: product.price * product.qty,
              orderId: order.id,
              productId: product.product,
            });
          }),
        ]);

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
      dispatch(populateOpenOrder(order, cartItems));
    } catch (err) {
      console.error('Could not get an open order:', err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_OPEN_ORDER:
      //populate open order if there are items on localStorage
      return action.cart;
    default:
      return state;
  }
};
