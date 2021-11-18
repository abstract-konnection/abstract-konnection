import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Box } from '@mui/system';
import { Container } from '@mui/material';
import { Stack } from '@mui/material';

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
//   margin: 10,
// }));

function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center">
			{'Copyright © '}
			<a href="https://abstract-konnection.herokuapp.com/" target="_blank">
				Abstract Konnection
			</a>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}
const theme = createTheme();
export default class AdminMainView extends React.Component {
	render() {
		const products = this.props.allProducts || [];
		return (
			<div>
				<ThemeProvider theme={theme}>
					<main>
						{/* Hero unit */}
						<Box
							sx={{
								bgcolor: 'background.paper',
								pt: 8,
								pb: 6,
								height: '100%',
							}}>
							<Container maxWidth="sm" sx={{ height: '100%' }}>
								<Typography
									component="h1"
									variant="h3"
									align="center"
									color="text.primary"
									gutterBottom>
									Administrator View
								</Typography>
								<Typography
									variant="h5"
									align="center"
									color="text.secondary"
									paragraph>
									Click on Users to see all users in our database. Click on
									Products to view, edit, and post new products.
								</Typography>
								<Stack
									sx={{ pt: 4 }}
									direction="row"
									spacing={2}
									justifyContent="center">
									<Link to="/admin/users">
										<Button variant="contained" size="large">
											Users
										</Button>
									</Link>
									<Link to="/admin/products">
										<Button variant="contained" size="large">
											Products
										</Button>
									</Link>
								</Stack>
							</Container>
						</Box>
					</main>
				</ThemeProvider>
				<Copyright />
			</div>
		);
	}
}
