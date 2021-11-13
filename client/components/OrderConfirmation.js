import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function OrderConfirmation(props) {
	//if there was no payment information or shipping information redirect to cart
	return (
		<div>
			<h1>Your Order is Confirmed!</h1>
			{/* display order items, address, and name from order */}
		</div>
	);
}
