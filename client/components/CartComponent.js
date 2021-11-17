import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems, removeCartItems } from '../store/cart';
import dbCartItems, { fetchOpenCartItems } from '../store/dbCartItems';
import {
	createOpenOrder,
	populateOpenOrder,
	deleteFromOpenOrder,
} from '../store/openCart';
import { Link } from 'react-router-dom';
import { me } from '../store/openCart';
import {
	Paper,
	Grid,
	Button,
	Box,
	Stack,
	Typography,
	MenuItem,
	InputLabel,
	Select,
} from '@mui/material';
//import DeleteIcon from '@mui/icons-material/delete';

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
	const productData = cartItems.length ? cartItems : dbCart;

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
			dispatch(removeCartItems(id));
			dispatch(deleteFromOpenOrder(order, id));
			// await dispatch(fetchOpenCartItems(auth.id));
			await dispatch(me());
		} else {
			await dispatch(removeCartItems(id));
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
			<h2>
				Subtotal ( {productData.length}
				{/* {productData.reduce((a, c) => a + Number(c.qty), 0)}{' '} */}
				{productData.length === 1 ? ' item' : ' items'}) : $
				{productData.reduce((a, c) => a + Number(c.price) * Number(c.qty), 0)}
			</h2>
			<Link to={'/checkout'}>
				<Button
					variant="contained"
					type="button"
					disabled={productData.length === 0}>
					Proceed to Checkout
				</Button>
			</Link>
			<Grid>
				<Typography variant="h3" align="center">
					Your Cart
				</Typography>
				<Stack
					sx={{ pt: 4 }}
					direction="row"
					spacing={2}
					justifyContent="center">
					<main>
						<div>
							{productData.length === 0 ? (
								<div>
									<Typography variant="h5" align="center">
										Your cart is currently empty.
									</Typography>
									<Link
										to="/"
										color="inherit"
										style={{
											justifyContent: 'center',
										}}>
										<Typography variant="h5" align="center">
											Go to Products
										</Typography>
									</Link>
								</div>
							) : (
								<ul>
									<main>
										{productData.map((item) => (
											<li key={item.productId}>
												<div>
													<div>
														<img src={item.imageURL} alt={item.title}></img>
													</div>
													<div>
														<Link
															to={`/products/${item.productId}`}
															color="inherit"
															style={{
																justifyContent: 'center',
															}}>
															<Typography variant="h5" align="center">
																{item.title}
															</Typography>
														</Link>
													</div>
													<div>
														<Typography variant="body1" align="center">
															Price: ${item.price}
														</Typography>
														<Stack
															sx={{ pt: 4 }}
															direction="row"
															spacing={2}
															justifyContent="center">
															<Box>
																<InputLabel
																	color="success"
																	variant="standard"
																	htmlFor="uncontrolled-native">
																	Quantity
																</InputLabel>
																<Select
																	size="small"
																	sx={{ width: '7ch', height: '3ch' }}
																	value={item.qty}
																	onChange={(e) =>
																		handleChange(
																			item.productId,
																			Number(e.target.value)
																		)
																	}>
																	{[...Array(item.quantity).keys()].map((e) => (
																		<MenuItem
																			size="small"
																			key={e + 1}
																			value={e + 1}>
																			{e + 1}
																		</MenuItem>
																	))}
																</Select>
															</Box>
															<Button
																size="small"
																variant="contained"
																onClick={() => removeFromCart(item.productId)}>
																{/* <DeleteIcon /> */}Remove
															</Button>
														</Stack>
														{/* <Button
																		variant="contained"
																		size="small"
																		disabled={item.qty <= 1}
																		onClick={() =>
																			handleChange(
																				item.productId,
																				Number(--item.qty)
																			)
																		}>
																		-
																	</Button>
																	<Typography>{item.qty}</Typography>
																	<Button
																		variant="contained"
																		size="small"
																		disabled={item.qty >= item.quantity}
																		onClick={() =>
																			handleChange(
																				item.productId,
																				Number(++item.qty)
																			)
																		}>
																		+
																	</Button> */}
													</div>
												</div>
											</li>
										))}
									</main>
								</ul>
							)}
						</div>
						{/* <Stack
							sx={{ pt: 4 }}
							direction="row"
							spacing={2}
							justifyContent="center">
							<ul>
								<li>
									<h2>
										Subtotal ( {productData.length}
										{/* {productData.reduce((a, c) => a + Number(c.qty), 0)}{' '} */}
						{/* {productData.length === 1 ? ' item' : ' items'}) : $
										{productData.reduce(
											(a, c) => a + Number(c.price) * Number(c.qty),
											0
										)}
									</h2>
								</li>
								<li>
									<Link to={'/checkout'}>
										<Button
											variant="contained"
											type="button"
											disabled={productData.length === 0}>
											Proceed to Checkout
										</Button>
									</Link>
								</li>
							</ul> */}
						{/* </Stack> */}
					</main>
				</Stack>
			</Grid>
		</div>
	);
}
