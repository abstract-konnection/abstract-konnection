import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/product';
import { addCartItems } from '../store/cart';
import { styled } from '@mui/material/styles';
import { createOpenOrder } from '../store/openCart';
import { Paper, Grid, Button, Box, Stack } from '@mui/material';
import AdminUpdateProduct from './AdminUpdateProduct';
import { me } from '../store/openCart';
import { CircularProgress } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body,
	padding: theme.spacing(7),
	textAlign: 'center',
	color: theme.palette.text.primary,
	margin: 50,
}));

class SingleProduct extends Component {
	constructor(props) {
		super();
		this.state = {
			qty: 1,
			quantity: 2,
			isLoading: false,
		};
		this.addToCart = this.addToCart.bind(this);
	}
	async componentDidMount() {
		this.setState({ isLoading: true });
		try {
			const id = await this.props.match.params.id;
			await this.props.loadSingleProduct(id);
			this.setState({ isLoading: false });
		} catch (error) {
			this.setState({ isLoading: false });
			console.log('Single Product', error);
		}
	}

	addToCart() {
		try {
			const id = this.props.match.params.id;
			const qty = this.state.qty;
			this.props.addCart(id, qty);
			// this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
			this.props.history.push(`/cart`);
		} catch (error) {
			console.log('addCart', error);
		}
	}
	// async addToCart() {
	// 	try {
	// 		const id = this.props.match.params.id;
	// 		const qty = this.state.qty;
	// 		await this.props.addCart(id, qty);
	// 		this.props.me();
	// 		// this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
	// 	} catch (error) {
	// 		console.log('addCart', error);
	// 	}
	// }

	render() {
		const product = this.props.product || {};
		return (
			<Grid container spacing={0} alignItems="center" justifyContent="center">
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
						<main>
							<Item>
								<img src={product.imageURL} />
								<h1>{product.title}</h1>
								<p>{product.description}</p>
								<h3>${product.price}</h3>
								{product.quantity > 0 && (
									<>
										<div>
											<div> Quantity </div>
											<div>
												<main>
													<select
														value={this.state.qty}
														onChange={(e) =>
															this.setState({ qty: e.target.value })
														}>
														{[...Array(product.quantity).keys()].map((e) => (
															<option key={e + 1} value={e + 1}>
																{e + 1}
															</option>
														))}
													</select>
												</main>
											</div>
										</div>
										<Grid>
											<Box>
												<Stack
													sx={{ pt: 4 }}
													direction="row"
													spacing={2}
													justifyContent="center">
													<Button
														variant="contained"
														size="large"
														onClick={this.addToCart}>
														Add to Cart
													</Button>
												</Stack>
											</Box>
										</Grid>
									</>
								)}
							</Item>
						</main>
					)}
				</div>
			</Grid>
		);
	}
}

const mapStateToProps = (state) => ({
	product: state.product,
	userObject: state.auth,
	isLoggedIn: !!state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
	loadSingleProduct: (id) => dispatch(setProducts(id)),
	addCart: (id, qty) => dispatch(addCartItems(id, qty)),
	createOpenOrder: (id) => dispatch(createOpenOrder(id)),
});

// const mapDispatchToProps = (dispatch) => ({
// 	loadSingleProduct: (id) => dispatch(setProducts(id)),
// 	addCart: (id, qty) => dispatch(addCartItems(id, qty)),
// 	me: () => dispatch(me()),
// });

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
