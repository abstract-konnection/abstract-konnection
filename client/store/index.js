import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import productReducer from './product';
import { cartReducer } from './cart';
import checkOutReducer from './checkout';
import orderReducer from './order';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItem')
      ? JSON.parse(localStorage.getItem('cartItem'))
      : [],
  },
};

const reducer = combineReducers({
  auth,
  allProducts: products,
  product: productReducer,
  cartItem: cartReducer,
  checkout: checkOutReducer,
  openOrder: orderReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
