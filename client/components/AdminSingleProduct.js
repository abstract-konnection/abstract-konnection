import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/product';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button } from '@mui/material';
import AdminUpdateProduct from './AdminUpdateProduct';

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
	}
	async componentDidMount() {
		try {
			const id = await this.props.match.params.id;
			await this.props.loadSingleProduct(id);
		} catch (error) {
			console.log('Single Product', error);
		}
	}

	render() {
		const product = this.props.product || {};
		return (
			<Grid container spacing={0} alignItems="center" justifyContent="center">
				<div>
					<main>
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
