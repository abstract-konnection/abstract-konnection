import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { fetchOpenCartItems } from '../store/dbCartItems';
import { createOpenOrder } from '../store/openCart';
import { Link } from 'react-router-dom';
import { CircularProgress, Grid, LinearProgress } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Mission from './Mission';

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

export class AllProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };
  }
  async componentDidMount() {
    this.setState({ isLoading: true });
    await this.props.fetchProducts();
    this.setState({ isLoading: false });
    if (this.props.isLoggedIn) {
      this.props.createOpenOrder(this.props.userObject.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.openOrder.id !== this.props.openOrder.id &&
      this.props.isLoggedIn
    ) {
      this.props.fetchOpenCartItems(this.props.userObject.id);
    }
  }
  render() {
    const products = this.props.allProducts || [];

    return (
      <div>
        {this.state.isLoading === true ? (
          <div>
            <Mission />
            <main>
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress color="secondary" />
              </Grid>
            </main>
          </div>
        ) : (
          <ThemeProvider theme={theme}>
            <Mission />
            <Grid
              container
              spacing={0}
              alignItems="center"
              justifyContent="center"
            >
              {products.length > 0 ? (
                products.map((product) => {
                  return (
                    <div key={product.id} id="products-view">
                      {/* <Item> */}
                      <Link
                        to={`/products/${product.id}`}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <img src={product.imageURL} />
                      </Link>
                    </div>
                  );
                })
              ) : (
                <h3>No Products currently exist</h3>
              )}
            </Grid>
            <Copyright />
          </ThemeProvider>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  allProducts: state.allProducts,
  userObject: state.auth,
  isLoggedIn: !!state.auth.id,
  openOrder: state.openOrder,
  isLoading: !state.allProducts.length,
  dbCartItems: state.dbCartItems,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  createOpenOrder: (userId) => dispatch(createOpenOrder(userId)),
  fetchOpenCartItems: (userId) => dispatch(fetchOpenCartItems(userId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
