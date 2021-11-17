import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems, removeCartItems } from '../store/cart';
import dbCartItems, { fetchOpenCartItems } from '../store/dbCartItems';
import { createOpenOrder } from '../store/openCart';
import { populateOpenOrder } from '../store/openCart';
import { Link } from 'react-router-dom';
import { me } from '../store/openCart';

export default function Cart(props) {
	const id = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const cart = useSelector((state) => state.cartItem);
	const order = useSelector((state) => state.openOrder);
	const dbCart = useSelector((state) => state.dbCartItems);
	const auth = useSelector((state) => state.auth);
	const { cartItems } = cart;
	const dispatch = useDispatch();
	const isLoggedIn = !!auth.id;
	const productData = dbCart.length ? dbCart : cartItems;

	const handleChange = async (itemId, qty) => {
		if (isLoggedIn) {
			await dispatch(addCartItems(itemId, qty));
			await dispatch(createOpenOrder(auth.id));
			await dispatch(fetchOpenCartItems(auth.id));
			await dispatch(me());
			// dispatch(populateOpenOrder(OrderID?)) or some other way to get the browser to update without refresh;
		} else {
			dispatch(addCartItems(itemId, qty));
		}
	};

	// const handleChange = (e, itemId) => {
	// 	if (isLoggedIn) {
	// 		dispatch(createOpenOrder(auth.id));
	// 		dispatch(addCartItems(itemId, Number(e.target.value)));
	// 		dispatch(createOpenOrder(auth.id));
	// 		dispatch(fetchOpenCartItems(auth.id));
	// 		// dispatch(populateOpenOrder(OrderID?)) or some other way to get the browser to update without refresh;
	// 	} else {
	// 		dispatch(addCartItems(itemId, Number(e.target.value)));
	// 	}
	// };

	const removeFromCart = async (id) => {
		if (isLoggedIn) {
			await dispatch(removeCartItems(id));
			//remove the order_product with the orderid and userid matching the user and order
			await dispatch(createOpenOrder(auth.id));
			await dispatch(fetchOpenCartItems(auth.id));
			await dispatch(me());
		} else {
			dispatch(removeCartItems(id));
		}
	};
	useEffect(() => {
		if (auth.id) {
			dispatch(fetchOpenCartItems(auth.id));
			dispatch(createOpenOrder(auth.id));
		}
	}, [auth, cartItems, dbCartItems]);

	return (
		<div>
			<div>
				<h1>Your Cart</h1>
				{productData.length === 0 ? (
					<div>
						<h3>Your cart is currently empty.</h3>
						<Link to="/">Go to Products</Link>
					</div>
				) : (
					<ul>
						{productData.map((item) => (
							<li key={item.productId}>
								<div>
									<div>
										<img src={item.imageURL} alt={item.title}></img>
									</div>
									<div>
										<Link to={`/products/${item.productId}`}>{item.title}</Link>
									</div>
									<div>
										<button
											onClick={() =>
												handleChange(item.productId, Number(--item.qty))
											}>
											-
										</button>
										<h3>{item.qty}</h3>
										<button
											onClick={() =>
												handleChange(item.productId, Number(++item.qty))
											}>
											+
										</button>
										{/* <select
											value={item.qty}
											onChange={(e) => handleChange(e, item.productId)}>
											{[...Array(item.quantity).keys()].map((e) => (
												<option key={e + 1} value={e + 1}>
													{e + 1}
												</option>
											))}
										</select> */}
									</div>
									<div>Price: ${item.price}</div>
									<button onClick={() => removeFromCart(item.productId)}>
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
								Subtotal ( {productData.length}
								{/* {productData.reduce((a, c) => a + Number(c.qty), 0)}{' '} */}
								{productData.length === 1 ? ' item' : ' items'}) : $
								{productData.reduce(
									(a, c) => a + Number(c.price) * Number(c.qty),
									0
								)}
							</h2>
						</li>
						<li>
							<Link to={'/checkout'}>
								<button type="button" disabled={productData.length === 0}>
									Proceed to Checkout
								</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}
