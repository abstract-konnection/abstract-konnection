import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateProduct } from '../store/products';
import { setProducts } from '../store/product';

class UpdateProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			description: '',
			price: '',
			quantity: '',
			imageURL: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidUpdate(prevProps) {
		if (prevProps.product.id !== this.props.product.id) {
			this.setState({
				title: this.props.product.title || '',
				description: this.props.product.description || '',
				price: this.props.product.price || '',
				quantity: this.props.product.quantity || '',
				imageURL: this.props.product.imageURL || '',
			});
		}
	}

	handleChange(evt) {
		this.setState({
			[evt.target.name]: evt.target.value,
		});
	}

	async handleSubmit(evt) {
		try {
			evt.preventDefault();
			await this.props.UpdateProduct({ ...this.props.product, ...this.state });
			this.props.loadSingleProduct(this.props.product.id);
		} catch (error) {
			console.log(error);
		}
	}
	render() {
		const { title, description, price, quantity, imageURL } = this.state;
		const { handleSubmit, handleChange } = this;
		return (
			<div>
				<main>
					<div>
						<h3>Update Product:</h3>
					</div>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="title">Product Title:</label>
							<input
								name="title"
								onChange={handleChange}
								value={title}
								required
							/>
						</div>
						<div>
							<label htmlFor="description">Description:</label>
							<input
								name="description"
								onChange={handleChange}
								value={description}
								required
							/>
						</div>
						<div>
							<label htmlFor="price">Price:</label>
							<input
								name="price"
								onChange={handleChange}
								value={price}
								required
							/>
						</div>
						<div>
							<label htmlFor="quantity">Quantity:</label>
							<input
								name="quantity"
								onChange={handleChange}
								value={quantity}
								required
							/>
						</div>
						<div>
							<label htmlFor="completed">Image Url:</label>
							<input
								name="completed"
								onChange={handleChange}
								value={imageURL}
								required
							/>
						</div>
						<div>
							<button type="submit">Submit</button>
						</div>
					</form>
				</main>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	product: state.product,
});

const mapDispatchToProps = (dispatch) => ({
	UpdateProduct: (product) => dispatch(updateProduct(product)),
	loadSingleProduct: (id) => dispatch(setProducts(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
