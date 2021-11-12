import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setProducts } from '../store/product';
import { addCartItems } from '../store/cart';
class SingleProduct extends Component {
	constructor(props) {
		super();
		this.state = {
			qty: 1,
			quantity: 2,
		};
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

	async addToCart() {
		try {
			const id = this.props.match.params.id;
			const qty = this.state.qty;
			await this.props.addCart(id, qty);
			// this.props.history.push(`/cart/${id}?qty=${this.state.qty}`);
		} catch (error) {
			console.log('addCart', error);
		}
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
					<div>
						<div>Status:</div>
						<div>
							{product.quantity > 0 ? (
								<span>In Stock</span>
							) : (
								<span>Unavailable</span>
							)}
						</div>
						{product.quantity > 0 && (
							<>
								<div>
									<div> Qty</div>
									<div>
										<select
											value={this.state.qty}
											onChange={(e) => this.setState({ qty: e.target.value })}>
											{[...Array(product.quantity).keys()].map((e) => (
												<option key={e + 1} value={e + 1}>
													{e + 1}
												</option>
											))}
										</select>
									</div>
								</div>
								<button
									type="button"
									name="Add to Cart"
									onClick={this.addToCart}>
									Add to Cart
								</button>
							</>
						)}
					</div>
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
	addCart: (id, qty) => dispatch(addCartItems(id, qty)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
