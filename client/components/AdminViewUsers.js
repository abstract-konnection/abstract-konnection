import React from 'react';
import { connect } from 'react-redux';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { fetchUsers } from '../store/users';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
	margin: 10,
}));

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<a href="https://abstract-konnection.herokuapp.com/" target="_blank">
				Abstract Konnection
			</a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
const theme = createTheme();
export class AdminViewUsers extends React.Component {
	componentDidMount() {
		this.props.fetchUsers();
	}
	render() {
		const users = this.props.users || [];
		return (
			<div>
				<Typography
					component="h1"
					variant="h3"
					align="center"
					color="text.primary"
					gutterBottom>
					Administrator View
				</Typography>
				<ThemeProvider theme={theme}>
					<Grid
						container
						spacing={0}
						alignItems="center"
						justifyContent="center">
						{users.length > 0 ? (
							users.map((user) => {
								return (
									<div key={user.id} id="products-view">
										<Item>
											<h6>{user.id}</h6>
											<h6>{user.username}</h6>
										</Item>
									</div>
								);
							})
						) : (
							<h3>You are not authorized to view this page.</h3>
						)}
					</Grid>
					<Copyright />
				</ThemeProvider>
			</div>
		);
	}
}

const mapState = ({ users }) => ({
	users,
});

const mapDispatch = (dispatch) => ({
	fetchUsers: () => dispatch(fetchUsers()),
});

export default connect(mapState, mapDispatch)(AdminViewUsers);
