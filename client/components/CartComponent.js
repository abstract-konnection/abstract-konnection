import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems } from '../store/cart';
import { Link } from 'react-router-dom';
export default function Cart(props) {
	const id = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const cart = useSelector((state) => state.cartItem);
	const { cartItems } = cart;
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	if (id) {
	// 		dispatch(addCartItems(id, qty));
	// 	}
	// }, [dispatch, id, qty]);

	const removeFromCart = (id) => {
		console.log('remove not yet implemented');
	};

	const checkOutItems = () => {
		props.history.push('/login?redirect=checkout');
	};
	return (
		<div>
			<div>
				<h1>Your Cart</h1>
				{cartItems.length === 0 ? (
					<div>
						<h3>Your cart is currently empty.</h3>
						<Link to="/">Go to Products</Link>
					</div>
				) : (
					<ul>
						{cartItems.map((item) => (
							<li key={item.product}>
								<div>
									<div>
										<img src={item.imageURL} alt={item.title}></img>
									</div>
									<div>
										<Link to={`/products/${item.product}`}>{item.title}</Link>
									</div>
									<div>
										<select
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addCartItems(item.product, Number(e.target.value))
												)
											}>
											{[...Array(item.quantity).keys()].map((e) => (
												<option key={e + 1} value={e + 1}>
													{e + 1}
												</option>
											))}
										</select>
									</div>
									<div>Price: ${item.price}</div>
									<button onClick={() => removeFromCart(item.product)}>
										Remove From Cart
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
			<div>
				<div>
					<ul>
						<li>
							<h2>
								Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
								{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
							</h2>
						</li>
						<li>
							<button
								type="button"
								onClick={checkOutItems}
								disabled={cartItems.length === 0}>
								Proceed to Checkout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
