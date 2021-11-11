import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCartItems } from '../store/cart';

export default function Cart(props) {
	const id = props.match.params.id;
	const qty = props.location.search
		? Number(props.location.search.split('=')[1])
		: 1;
	const dispatch = useDispatch();
	useEffect(() => {
		if (id) {
			dispatch(addCartItems(id, qty));
		}
	}, [dispatch, id, qty]);
	return (
		<div>
			<h1>Your Cart</h1>
			<p>
				ADDED TO CART: PRODUCTID: {id} Qty={qty}
			</p>
		</div>
	);
}
