import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Review(props) {
	const [status, setStatus] = useState('closed');
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (auth.id) {
	// 		dispatch(closeOrder(auth.id));
	// 	}
	// });
	return (
		<React.Fragment>
			<Typography variant="h6" gutterBottom>
				Order summary
			</Typography>
			<List disablePadding>
				{props.cartItems.map((product) => (
					<ListItem key={product.id} sx={{ py: 1, px: 0 }}>
						<ListItemText primary={product.title} />
						<Typography variant="body2">
							${product.price} * {product.qty}(items) = $
							{product.price * product.qty}
						</Typography>
					</ListItem>
				))}

				<ListItem sx={{ py: 1, px: 0 }}>
					<ListItemText primary="Total" />
					<Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
						({props.cartItems.reduce((a, c) => a + Number(c.qty), 0)} items) : $
						{props.cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
					</Typography>
				</ListItem>
			</List>
		</React.Fragment>
	);
}

const mapStateToProps = (state) => ({
	cartItems: state.cartItem.cartItems,
});

export default connect(mapStateToProps)(Review);
