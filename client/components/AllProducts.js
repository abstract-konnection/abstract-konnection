import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { createOpenOrder } from '../store/openCart';
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
  componentDidMount() {
    this.props.fetchProducts();
    if (this.props.isLoggedIn) {
      this.props.createOpenOrder(this.props.userObject.id);
    }
  }
  render() {
    const products = this.props.allProducts || [];
    const { isLoggedIn } = this.props;
    //automatically opens an order for loggedIn users
    //maybe check to see if an order is already open?
    // if (isLoggedIn) {
    //   this.props.createOpenOrder(this.props.userObject.id);
    // }
    return (
      <div>
        <ThemeProvider theme={theme}>
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
      </div>
    );
  }
}

const mapState = (state) => ({
  allProducts: state.allProducts,
  userObject: state.auth,
  isLoggedIn: !!state.auth.id,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  createOpenOrder: (userId) => dispatch(createOpenOrder(userId)),
});

export default connect(mapState, mapDispatch)(AllProducts);
