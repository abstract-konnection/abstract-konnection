import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Paper, Grid, Button } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: 10,
}));

export class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }
  render() {
    const products = this.props.allProducts || [];
    return (
      <div>
        <Grid container spacing={0} alignItems="center" justifyContent="center">
          {products.length > 0 ? (
            products.map((product) => {
              return (
                <div key={product.id} id="products-view">
                  <Item>
                    <Link
                      to={`/products/${product.id}`}
                      style={{ textDecoration: 'none', color: 'black' }}
                    >
                      <img src={product.imageURL} />
                      <h3>Title: {product.title}</h3>
                    </Link>
                    <h4>Price: ${product.price}</h4>
                    <Button
                      // onClick={() => } // add logic to dispatch thunk creator to add item to cart
                      variant="contained"
                    >
                      Add To Cart
                    </Button>
                  </Item>
                </div>
              );
            })
          ) : (
            <h3>No Products currently exist</h3>
          )}
        </Grid>
      </div>
    );
  }
}

const mapState = ({ allProducts }) => ({
  allProducts,
});

const mapDispatch = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
});

export default connect(mapState, mapDispatch)(AllProducts);