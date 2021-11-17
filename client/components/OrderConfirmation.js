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
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { closeOrder } from '../store/order';

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<Link
				color="inherit"
				href="https://abstract-konnection.herokuapp.com/"
				target="_blank">
				Abstract Konnection
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const theme = createTheme();

export default function OrderConfirmation() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const isLoggedIn = !!auth.id;

	useEffect(() => {
		if (auth.id) {
			dispatch(closeOrder(auth.id));
		}
	});
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
				}}></AppBar>
			<Typography variant="subtitle1">
				Your order number is #2001539. We have emailed your order confirmation,
				and will send you an update when your order has shipped.
			</Typography>
			<Copyright />
		</ThemeProvider>
	);
}
