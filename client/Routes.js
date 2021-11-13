import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import AllProducts from './components/AllProducts';
import SingleProduct from './components/SingleProduct';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import OrderConfirmation from './components/OrderConfirmation';

/**
 * COMPONENT
 */
class Routes extends Component {
	componentDidMount() {
		this.props.loadInitialData();
	}

	render() {
		const { isLoggedIn } = this.props;

		return (
			<div>
				{/* {isLoggedIn ? (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/home" component={Home} />
            <Redirect to="/home" />
          </Switch>
        ) : (
          <Switch>
            <Route path="/" exact component={AllProducts} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        )} */}
				<Switch>
					<Route exact path="/" exact component={AllProducts} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/signup" component={Signup} />
					<Route exact path="/products/:id" component={SingleProduct} />
					<Route exact path="/cart/checkout" component={Checkout} />
					<Route exact path="/payment" component={Payment} />
					<Route
						exact
						path="/orderConfirmation"
						component={OrderConfirmation}
					/>
				</Switch>
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
