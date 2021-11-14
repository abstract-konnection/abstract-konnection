import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   margin: 10,
// }));

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
export class AdminMainView extends React.Component {
	componentDidMount() {
		this.props.fetchProducts();
	}
	render() {
		const products = this.props.allProducts || [];
		return (
			<div>
				<h1>Administrator View</h1>
				<ThemeProvider theme={theme}>
					<Grid
						container
						spacing={0}
						alignItems="center"
						justifyContent="center"></Grid>
					<h6>
						Will show a button for all products(where they can edit, remove, add
						product) and all users
					</h6>
					<Copyright />
				</ThemeProvider>
			</div>
		);
	}
}

const mapState = ({ allProducts }) => ({
	allProducts,
});

const mapDispatch = (dispatch) => ({
	fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AdminAllProducts);
