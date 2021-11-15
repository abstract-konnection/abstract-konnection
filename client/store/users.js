import axios from 'axios';
//action type
const GET_USERS = 'GET_USERS';

const getAllUsers = (users) => ({
	type: GET_USERS,
	users,
});

// export const fetchUsers = () => {
// 	return async (dispatch) => {
// 		try {
// 			const token = window.localStorage.getItem('token');
// 			if (token) {
// 				const { data } = await axios.get('/api/users', {
// 					headers: {
// 						authorization: token,
// 					},
// 				});
// 				dispatch(getAllUsers(data));
// 			}
// 		} catch (error) {
// 			console.log('Fetch All Users thunk: ', error);
// 		}
// 	};
// };

export const fetchUsers = () => async (dispatch) => {
	try {
		const token = window.localStorage.getItem('token');
		if (token) {
			const res = await axios.get('/api/users', {
				headers: {
					authorization: token,
				},
			});
			return dispatch(getAllUsers(res.data));
		}
	} catch (error) {
		console.log('Fetch All Users thunk: ', error);
	}
};

export default function usersReducer(state = [], action) {
	switch (action.type) {
		case GET_USERS:
			return action.users;
		default:
			return state;
	}
}
