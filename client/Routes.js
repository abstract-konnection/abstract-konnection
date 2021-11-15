import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Checkout from './components/Checkout';
import AdminMainView from './components/AdminMainView';
import AdminAllProducts from './components/AdminAllProducts';
import AdminSingleProduct from './components/AdminSingleProduct';
import AdminViewUsers from './components/AdminViewUsers';
import NotFound from './components/NotFound';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;
		const { isAdmin } = this.props;

		return (
			<div>
				{isLoggedIn && isAdmin ? (
					<Switch>
						<Route exact path="/admin" component={AdminMainView} />
						<Route exact path="/admin/products" component={AdminAllProducts} />
						<Route exact path="/admin/users" component={AdminViewUsers} />
						<Route
							exact
							path="/admin/products/:id"
							component={AdminSingleProduct}
						/>
						<Route exact path="/" exact component={AllProducts} />
						<Route exact path="/products/:id" component={SingleProduct} />
						<Route exact path="/checkout" component={Checkout} />
						<Redirect to="/" />
					</Switch>
				) : isLoggedIn ? (
					<Switch>
						<Route exact path="/" exact component={AllProducts} />
						<Route exact path="/products/:id" component={SingleProduct} />
						<Route exact path="/checkout" component={Checkout} />
						<Redirect to="/" />
					</Switch>
				) : (
					<Switch>
						<Route exact path="/" exact component={AllProducts} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/products/:id" component={SingleProduct} />
						<Route exact path="/checkout" component={Checkout} />
						<Redirect to="/" />
					</Switch>
				)}
			</div>
		);
	}
}

/**
 * CONTAINER
 */
const mapState = (state) => {
	return {
		// Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
		// Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
		isLoggedIn: !!state.auth.id,
		isAdmin: !!state.auth.admin,
	};
};

const mapDispatch = (dispatch) => {
	return {
		loadInitialData() {
			dispatch(me());
		},
	};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
