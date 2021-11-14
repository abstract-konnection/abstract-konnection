import axios from 'axios';
//action type
const GET_USERS = 'GET_USERS';

const getAllUsers = (users) => ({
	type: GET_USERS,
	users,
});

export const fetchUsers = () => {
	return async (dispatch) => {
		try {
			const { data } = await axios.get('/api/users');
			dispatch(getAllUsers(data));
		} catch (error) {
			console.log('Fetch All Users thunk: ', error);
		}
	};
};

export default function usersReducer(state = [], action) {
	switch (action.type) {
		case GET_USERS:
			return action.users;
		default:
			return state;
	}
}
