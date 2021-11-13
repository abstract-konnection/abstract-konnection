// import { propsToClassKey } from '@mui/styles';
// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { saveAddress } from '../store/checkout';
// import { styled } from '@mui/material/styles';
// import { Paper, Grid, Button } from '@mui/material';

// const Item = styled(Paper)(({ theme }) => ({
// 	...theme.typography.body,
// 	padding: theme.spacing(7),
// 	textAlign: 'center',
// 	color: theme.palette.text.primary,
// 	margin: 50,
// }));

// export default function Checkout(props) {
// 	//if not logged in user redirect to log in screen else they can view the Checkout screen
// 	//if there are no items in cart redirect to all products or cart
// 	const [address, setAddress] = useState('');
// 	const [email, setEmail] = useState('');
// 	const dispatch = useDispatch();
// 	const submitHandle = (event) => {
// 		event.preventDefault();
// 		dispatch(saveAddress({ address, email }));
// 		props.history.push('/payment');
// 	};
// 	return (
// 		<div>
// 			<form onSubmit={submitHandle}>
// 				<div>
// 					<h1>Shipping Information</h1>
// 					<div>
// 						<label htmlFor="Name">Name</label>
// 						<input type="text" placeholder="Enter name" required></input>
// 					</div>
// 					<div>
// 						<label htmlFor="Email">Email</label>
// 						<input
// 							type="text"
// 							placeholder="Enter email"
// 							required
// 							value={email}
// 							onChange={(e) => setEmail(e.target.value)}></input>
// 					</div>
// 					<div>
// 						<label htmlFor="Address">Address</label>
// 						<input
// 							type="text"
// 							placeholder="Enter address"
// 							required
// 							value={address}
// 							onChange={(e) => setAddress(e.target.value)}></input>
// 					</div>
// 					<div>
// 						<label htmlFor="City">City</label>
// 						<input type="text" placeholder="Enter city" required></input>
// 					</div>
// 					<div>
// 						<label htmlFor="Zip Code">Zip Code</label>
// 						<input type="text" placeholder="Enter zip code" required></input>
// 					</div>
// 					<div>
// 						<label htmlFor="Country">Country</label>
// 						<input type="text" placeholder="Enter country" required></input>
// 					</div>
// 					<div>
// 						<label />
// 						<Button variant="contained" size="large" type="submit">
// 							Proceed to Payment
// 						</Button>
// 					</div>
// 				</div>
// 			</form>
// 		</div>
// 	);
// }

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { saveAddress } from '../store/checkout';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <PaymentForm />;
		case 2:
			return <Review />;
		default:
			throw new Error('Unknown step');
	}
}

const theme = createTheme();

export default function Checkout() {
	// 	//if not logged in user redirect to log in screen else they can view the Checkout screen
	// 	//if there are no items in cart redirect to all products or cart
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = (event) => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<AppBar
				position="absolute"
				color="default"
				elevation={0}
				sx={{
					position: 'relative',
					borderBottom: (t) => `1px solid ${t.palette.divider}`,
				}}>
				<Toolbar>
					<Typography variant="h6" color="inherit" noWrap>
						Abstract Konnection
					</Typography>
				</Toolbar>
			</AppBar>
			<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
					<Typography component="h1" variant="h4" align="center">
						Checkout
					</Typography>
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography variant="h5" gutterBottom>
									Thank you for your order.
								</Typography>
								<Typography variant="subtitle1">
									Your order number is #2001539. We have emailed your order
									confirmation, and will send you an update when your order has
									shipped.
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
									{activeStep !== 0 && (
										<Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
											Back
										</Button>
									)}

									<Button
										variant="contained"
										onClick={handleNext}
										sx={{ mt: 3, ml: 1 }}>
										{activeStep === steps.length - 1 ? 'Place order' : 'Next'}
									</Button>
								</Box>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
				<Copyright />
			</Container>
		</ThemeProvider>
	);
}
