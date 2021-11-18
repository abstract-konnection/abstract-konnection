import React from 'react';
import { connect } from 'react-redux';
import { fetchProductsAdmin, fetchProducts } from '../store/products';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid, Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AdminPostProduct from './AdminPostProduct';
import { CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
export class AdminAllProducts extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			products: [],

			page: 1,
			count: 0,
			pageSize: 5,

			isLoading: false,
		};

		this.setupFetchProductsDispatch =
			this.setupFetchProductsDispatch.bind(this);
		this.handlePageChange = this.handlePageChange.bind(this);
	}

	async componentDidMount() {
		this.setState({ isLoading: true });

		// Setup the product dispatch
		await this.setupFetchProductsDispatch();

		//await this.props.fetchProducts();

		this.setState({ isLoading: false });
	}

	// Sets up a Dispatch by reading the current state and sending it's props to the thunk.
	setupFetchProductsDispatch() {
		const { page, pageSize } = this.state;
		const params = this.fetchPageParams(page, pageSize);

		// Send the Dispatch for the Product range
		this.props.fetchProducts(params);
	}

	// Will check if the parameters exist and are defined. Then return an object to send to dispatch
	// Do not bind this - it would cause a "can't call setState on a component that is not yet mounted."
	fetchPageParams(page, pageSize) {
		let params = {};

		if (page) {
			params['page'] = page - 1;
		}
		if (pageSize) {
			params['pageSize'] = pageSize;
		}
		return params;
	}

	handlePageChange(event, value) {
		this.setState({ page: value }, () => {
			this.setupFetchProductsDispatch();
		});
	}
	render() {
		const products = this.props.allProducts.products || [];
		const { totalPages, page } = this.props.allProducts;
		return (
			<div>
				{this.state.isLoading === true ? (
					<div>
						<main>
							<Grid
								container
								spacing={0}
								alignItems="center"
								justifyContent="center">
								<CircularProgress color="secondary" />
							</Grid>
						</main>
					</div>
				) : (
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
							<AdminPostProduct />
							<div className="parent">
								<Pagination
									className="child"
									count={totalPages}
									page={page}
									siblingCount={1}
									boundaryCount={1}
									variant="outlined"
									shape="rounded"
									onChange={this.handlePageChange}
									sx={{
										margin: 0,
									}}
								/>
							</div>
							<Grid
								container
								spacing={0}
								alignItems="center"
								justifyContent="center">
								<div id="admin-table">
									<TableContainer component={Paper}>
										<Table sx={{ minWidth: 600 }} aria-label="simple table">
											<TableHead>
												<TableRow>
													<TableCell>Image</TableCell>
													<TableCell align="right">Title</TableCell>
													<TableCell align="right">Description</TableCell>
													<TableCell align="right">Price</TableCell>
												</TableRow>
											</TableHead>
											<TableBody>
												{products.map((product) => {
													return (
														<TableRow
															key={product.id}
															sx={{
																'&:last-child td, &:last-child th': {
																	border: 0,
																},
															}}>
															<TableCell component="th" scope="row">
																<Link
																	to={`/admin/products/${product.id}`}
																	style={{
																		textDecoration: 'none',
																		color: 'black',
																	}}>
																	<img
																		src={product.imageURL}
																		id="admin-products-view"
																	/>
																</Link>
															</TableCell>
															<TableCell align="right">
																{product.title}
															</TableCell>
															<TableCell align="right">
																{product.description}
															</TableCell>
															<TableCell align="right">
																{product.price}
															</TableCell>
														</TableRow>
													);
												})}
											</TableBody>
										</Table>
									</TableContainer>
								</div>
							</Grid>
							<Copyright />
						</ThemeProvider>
					</div>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	allProducts: state.allProducts,
	userObject: state.auth,
	dbCartItems: state.dbCartItems,
});

const mapDispatch = (dispatch) => ({
	fetchProducts: (params) => dispatch(fetchProducts(params)),
});

export default connect(mapState, mapDispatch)(AdminAllProducts);
