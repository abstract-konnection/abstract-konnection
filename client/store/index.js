import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import products from './products';
import productReducer from './product';
import checkOutReducer from './checkout';
import usersReducer from './user';
import ordersReducer from './order';

const reducer = combineReducers({
	auth,
	allProducts: products,
	product: productReducer,
	checkout: checkOutReducer,
	users: usersReducer,
	orders: ordersReducer,
});

const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
