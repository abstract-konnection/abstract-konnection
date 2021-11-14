const axios = require('axios');

const CREATE_OPEN_ORDER = 'CREATE_OPEN_ORDER';

const _createOpenOrder = (order) => ({
  type: CREATE_OPEN_ORDER,
  order,
});

export const createOpenOrder = (userId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`api/orders/users/${userId}`);
      dispatch(_createOpenOrder(data));
    } catch (err) {
      console.error('Could not get an open order:', err);
    }
  };
};

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_OPEN_ORDER:
      return action.order;
    default:
      return state;
  }
};
