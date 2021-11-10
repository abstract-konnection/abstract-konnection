import axios from 'axios';
//action type
const GET_PRODUCTS = 'GET_PRODUCTS';

//action creator
const getAllProducts = (products) => ({
  type: GET_PRODUCTS,
  products,
});

//thunk
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('/api/products');
      dispatch(getAllProducts(data));
    } catch (error) {
      console.log('Fetch All Products thunk: ', error);
    }
  };
};

//reducer
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
