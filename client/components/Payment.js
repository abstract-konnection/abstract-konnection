import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

export default function Payment(props) {
	const submitCard = (e) => {
		e.preventDefault();
		props.history.push('/orderConfirmation');
	};
	return (
		<div>
			<h3>Enter Credit Card</h3>
			<form onSubmit={submitCard}>
				<div>
					<div>
						<label htmlFor="Name">Name</label>
						<input type="text" placeholder="Enter name" required></input>
					</div>
					<div>
						<label htmlFor="Credit Card Number">Credit Card Number</label>
						<input type="text" placeholder="Enter credit card" required></input>
					</div>
					<div>
						<label htmlFor="CCV">CCV Number</label>
						<input
							type="text"
							placeholder="Enter three digit CCV"
							required></input>
					</div>
					<div>
						<label htmlFor="Expiration Date">Expiration Date</label>
						<input
							type="text"
							placeholder="Enter Expiration Date"
							required></input>
					</div>
					<div>
						<label />
						<button type="submit">Confirm Credit Card Payment</button>
					</div>
				</div>
			</form>
		</div>
	);
}
