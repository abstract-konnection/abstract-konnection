import axios from 'axios';

import { CLEAR_AFTER_LOGOUT } from '.';
const initialState = {
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

export const ADD_CART_ITEM = 'ADD_CART_ITEM';
export const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM';

const addCartItem = (product, qty) => {
  return {
    type: ADD_CART_ITEM,
    payload: {
      title: product.title,
      imageURL: product.imageURL,
      price: product.price,
      quantity: product.quantity,
      productId: product.id,
      qty,
    },
  };
};

const removeCartItem = (product) => {
  return {
    type: REMOVE_CART_ITEM,
    payload: {
      title: product.title,
      imageURL: product.imageURL,
      price: product.price,
      quantity: product.quantity,
      productId: product.id,
    },
  };
};

export const addCartItems = (id, qty) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(addCartItem(data, qty));
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cartItem.cartItems)
      );
    } catch (error) {
      console.log('Add to cart thunk:', error);
    }
  };
};

export const removeCartItems = (id) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      dispatch(removeCartItem(data));
      //get current items in localStorage and splice out product to remove
      let cartItems = JSON.parse(localStorage.getItem('cartItems'));
      cartItems = cartItems.filter((product) => product.productId !== id);
      localStorage.setItem(
        'cartItems',
        JSON.stringify(getState().cartItem.cartItems)
      );
    } catch (error) {
      console.log('Delete to cart thunk:', error);
    }
  };
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CART_ITEM:
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (e) => e.productId === item.productId
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((e) =>
            e.productId === existingItem.productId ? item : e
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_CART_ITEM:
      const product = action.payload;
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.productId !== product.productId
          ),
        ],
      };
    case CLEAR_AFTER_LOGOUT:
      return {
        cartItems: [],
      };
    default:
      return state;
  }
};
