import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../store';

const Navbar = ({ handleClick, isLoggedIn }) => {
  let cartItem = useSelector((state) => state.cartItem);
  const { cartItems } = cartItem;
  return (
    <div>
      <h1>FS-App-Template</h1>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">
              Cart
              {cartItems.length > 1 ? (
                <div>
                  <span> {cartItems.length} Paintings In Cart</span>
                </div>
              ) : cartItems.length === 0 ? (
                <div>
                  <span>No Paintings In Cart</span>
                </div>
              ) : (
                <div>
                  <span>1 Painting In Cart</span>
                </div>
              )}
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/">Home</Link>
            <Link to="/cart">
              Cart
              {cartItems.length > 1 ? (
                <div>
                  <span> {cartItems.length} Paintings In Cart</span>
                </div>
              ) : cartItems.length === 0 ? (
                <div>
                  <span>No Paintings In Cart</span>
                </div>
              ) : (
                <div>
                  <span>1 Painting In Cart</span>
                </div>
              )}
            </Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
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
