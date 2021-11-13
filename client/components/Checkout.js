import { propsToClassKey } from '@mui/styles';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveAddress } from '../store/checkout';

export default function Checkout(props) {
	//if not logged in user redirect to log in screen else they can view the Checkout screen
    //if there are no items in cart redirect to all products or cart
	const [address, setAddress] = useState('');
	const [email, setEmail] = useState('');
	const dispatch = useDispatch();
	const submitHandle = (event) => {
		event.preventDefault();
		dispatch(saveAddress({ address, email }));
		props.history.push('/payment');
	};
	return (
		<div>
			<form onSubmit={submitHandle}>
				<div>
					<h1>Shipping Information</h1>
					<div>
						<label htmlFor="Name">Name</label>
						<input type="text" placeholder="Enter name" required></input>
					</div>
					<div>
						<label htmlFor="Email">Email</label>
						<input
							type="text"
							placeholder="Enter email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor="Address">Address</label>
						<input
							type="text"
							placeholder="Enter address"
							required
							value={address}
							onChange={(e) => setAddress(e.target.value)}></input>
					</div>
					<div>
						<label htmlFor="City">City</label>
						<input type="text" placeholder="Enter city" required></input>
					</div>
					<div>
						<label htmlFor="Zip Code">Zip Code</label>
						<input type="text" placeholder="Enter zip code" required></input>
					</div>
					<div>
						<label htmlFor="Country">Country</label>
						<input type="text" placeholder="Enter country" required></input>
					</div>
					<div>
						<label />
						<button type="submit">Proceed to Payment</button>
					</div>
				</div>
			</form>
		</div>
	);
}
