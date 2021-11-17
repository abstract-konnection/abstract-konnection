/* eslint-disable jsx-quotes */
import React, { Component } from 'react';
import { createProducts } from '../store/products';
import { connect } from 'react-redux';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Grid, Typography } from '@mui/material';

class CreateProduct extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      price: '',
      quantity: '',
      imageURL: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.createProducts({ ...this.state });
    this.setState(
      (this.state = {
        title: '',
        description: '',
        price: '',
        quantity: '',
        imageURL: '',
      })
    );
  }

  render() {
    const { title, description, price, quantity, imageURL } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <div>
        <main>
          <Typography
            component="h1"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Add a product
          </Typography>
          <Grid
            container
            spacing={0}
            alignItems="center"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title">Product Title:</label>
                <input
                  name="title"
                  onChange={handleChange}
                  value={title}
                  required
                />
              </div>
              <div>
                <label htmlFor="description">Description:</label>
                <input
                  name="description"
                  onChange={handleChange}
                  value={description}
                  required
                />
              </div>
              <div>
                <label htmlFor="price">Price:</label>
                <input
                  name="price"
                  onChange={handleChange}
                  value={price}
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  name="quantity"
                  onChange={handleChange}
                  value={quantity}
                  required
                />
              </div>
              <div>
                <label htmlFor="imageURL">Image Url:</label>
                <input
                  name="imageURL"
                  onChange={handleChange}
                  value={imageURL}
                  required
                />
              </div>
              <div>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Grid>
        </main>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createProducts: (product) => dispatch(createProducts(product)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
