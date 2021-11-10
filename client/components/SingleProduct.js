import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/product';

class SingleProduct extends Component {
	constructor() {
		super();
		this.addToCart = this.addToCart.bind(this);
	}
	async componentDidMount() {
		try {
			const id = await this.props.match.params.id;
			await this.props.loadSingleProduct(id);
		} catch (error) {
			console.log('Single Product', error);
		}
	}

	addToCart() {
		console.log('not yet');
	}

	render() {
		const product = this.props.product || {};
		return (
			<div>
				<main>
					<img src={product.imageURL} />
					<h1>{product.title}</h1>
					<p>{product.description}</p>
					<h3>${product.price}</h3>
					<button type="button" name="Add to Cart" onClick={this.addToCart}>
						Add to Cart
					</button>
				</main>
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

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
