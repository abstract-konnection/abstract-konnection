import axios from 'axios';

const SET_ADDRESS = 'SET_ADDRESS';

const setAddress = (data) => {
	return {
		type: SET_ADDRESS,
		data,
	};
};

export const saveAddress = (data) => {
	return async (dispatch) => {
		try {
            //need route to add address to address model and connect it to order model 
			dispatch(setAddress(data));
			localStorage.setItem('address', JSON.stringify(data));
		} catch (error) {
			console.log('Save Address thunk:', error);
		}
	};
};

export default function checkOutReducer(state = { cartItems: [] }, action) {
	switch (action.type) {
		case SET_ADDRESS:
			return { ...state, address: action.data };
		default:
			return state;
	}
}
