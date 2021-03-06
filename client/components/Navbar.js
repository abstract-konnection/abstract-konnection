import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout, clearOpenOrder } from '../store';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Navbar = ({
	handleClick,
	isLoggedIn,
	isAdmin,
	dbCartItems,
	localStorageCart,
}) => (
	<Box sx={{ flexGrow: 1 }}>
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
					<Link to="/" style={{ color: '#FFF' }}>
						AK(c)
					</Link>
				</Typography>
				{isLoggedIn && isAdmin ? (
					<div>
						<Link to="/admin" style={{ color: '#FFF' }}>
							<Button color="inherit">
								<AdminPanelSettingsIcon />
							</Button>
						</Link>
						<Link to="/" style={{ color: '#FFF' }}>
							<Button color="inherit">
								<HomeIcon />
							</Button>
						</Link>
						<Link to="/cart" style={{ color: '#FFF' }}>
							<Button color="inherit">
								<ShoppingCartIcon />
							</Button>
						</Link>
						<Button color="inherit" onClick={handleClick}>
							Logout
						</Button>
					</div>
				) : isLoggedIn ? (
					<div>
						<Link to="/" style={{ color: '#FFF' }}>
							<Button color="inherit">
								<HomeIcon />
							</Button>
						</Link>
						<Link to="/cart" style={{ color: '#FFF' }}>
							<Button color="inherit">
								<ShoppingCartIcon />
							</Button>
						</Link>
						<Button color="inherit" onClick={handleClick}>
							Logout
						</Button>
					</div>
				) : (
					<div>
						<Link to="/">
							<Button color="inherit" style={{ color: '#FFF' }}>
								<HomeIcon />
							</Button>
						</Link>
						<Link to="/cart">
							<Button color="inherit" style={{ color: '#FFF' }}>
								<ShoppingCartIcon />
							</Button>
						</Link>
						<Link to="/login">
							<Button color="inherit" style={{ color: '#FFF' }}>
								Login
							</Button>
						</Link>
						<Link to="/signup">
							<Button color="inherit" style={{ color: '#FFF' }}>
								Sign Up
							</Button>
						</Link>
					</div>
				)}
			</Toolbar>
		</AppBar>
	</Box>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		isLoggedIn: !!state.auth.id,
		isAdmin: !!state.auth.admin,
		dbCartItems: state.dbCartItems,
		localStorageCart: state.cartItem.cartItems,
	};
};

const mapDispatch = (dispatch) => {
	return {
		handleClick() {
			dispatch(logout());
		},
	};
};

export default connect(mapState, mapDispatch)(Navbar);
