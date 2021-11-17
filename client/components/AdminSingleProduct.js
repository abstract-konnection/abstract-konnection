import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/product';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button, Typography } from '@mui/material';
import AdminUpdateProduct from './AdminUpdateProduct';
import { CircularProgress } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
	...theme.typography.body,
	padding: theme.spacing(7),
	textAlign: 'center',
	color: theme.palette.text.primary,
	margin: 50,
}));

class AdminSingleProduct extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
		};
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

	render() {
		const product = this.props.product || {};
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
					<Grid
						container
						spacing={0}
						alignItems="center"
						justifyContent="center">
						<div>
							<main>
								<Typography
									component="h1"
									variant="h3"
									align="center"
									color="text.primary"
									gutterBottom>
									Administrator View
								</Typography>
								<Item>
									<img src={product.imageURL} />
									<h1>{product.title}</h1>
									<p>{product.description}</p>
									<h3>${product.price}</h3>
								</Item>
								<AdminUpdateProduct />
							</main>
						</div>
					</Grid>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
	loadSingleProduct: (id) => dispatch(setProducts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleProduct);
