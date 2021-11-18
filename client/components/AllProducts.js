import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { fetchOpenCartItems } from '../store/dbCartItems';
import { createOpenOrder } from '../store/openCart';
import { Link } from 'react-router-dom';
import { Grid, Pagination, CircularProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import store from '../store';
import '../../public/AllProducts.css';
import Mission from './Mission';

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

export class AllProducts extends React.Component {
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
		if (this.props.isLoggedIn) {
			this.props.createOpenOrder(this.props.userObject.id);
		}
	}
	componentDidUpdate(prevProps) {
		if (
			prevProps.openOrder.id !== this.props.openOrder.id &&
			this.props.isLoggedIn
		) {
			this.props.fetchOpenCartItems(this.props.userObject.id);
		}
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
						<Mission />
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
					<ThemeProvider theme={theme}>
						<Mission />
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
							{products.length > 0 ? (
								products.map((product) => {
									return (
										<div key={product.id} id="products-view">
											{/* <Item> */}
											<Link
												to={`/products/${product.id}`}
												style={{ textDecoration: 'none', color: 'black' }}>
												<img src={product.imageURL} />
											</Link>
										</div>
									);
								})
							) : (
								<h3>No Products currently exist</h3>
							)}
						</Grid>
						<Copyright />
					</ThemeProvider>
				)}
			</div>
		);
	}
}

const mapState = (state) => ({
	allProducts: state.allProducts,
	userObject: state.auth,
	isLoggedIn: !!state.auth.id,
	openOrder: state.openOrder,
	dbCartItems: state.dbCartItems,
});

const mapDispatch = (dispatch) => ({
	fetchProducts: (params) => dispatch(fetchProducts(params)),
	createOpenOrder: (userId) => dispatch(createOpenOrder(userId)),
	fetchOpenCartItems: (userId) => dispatch(fetchOpenCartItems(userId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
