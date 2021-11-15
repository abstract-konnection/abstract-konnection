import axios from 'axios';
//action type
const GET_ORDERS = 'GET_ORDERS';

const getAllOrders = (orders) => ({
  type: GET_ORDERS,
  orders,
});

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
    default:
      return state;
  }
}
