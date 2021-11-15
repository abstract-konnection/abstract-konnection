import axios from 'axios';
import history from '../history';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';
export const CLEAR_AFTER_LOGOUT = 'CLEAR_AFTER_LOGOUT';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
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

export const authenticate = (formData, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, formData);
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    // history.push('/');
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: CLEAR_AFTER_LOGOUT,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case CLEAR_AFTER_LOGOUT:
      return action.auth;
    default:
      return state;
  }
}
