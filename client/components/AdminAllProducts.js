import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../store/products';
// import Link from '@mui/material/Link';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import AdminPostProduct from './AdminPostProduct';
import { CircularProgress } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
export class AdminAllProducts extends React.Component {
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
  }
  render() {
    const products = this.props.allProducts || [];
    return (
      <div>
        {this.state.isLoading === true ? (
          <div>
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
          <div>
            <Typography
              component="h1"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Administrator View
            </Typography>
            <ThemeProvider theme={theme}>
              <AdminPostProduct />
              <Grid
                container
                spacing={0}
                alignItems="center"
                justifyContent="center"
              >
                <div id="admin-table">
                  <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 600 }} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Image</TableCell>
                          <TableCell align="right">Title</TableCell>
                          <TableCell align="right">Description</TableCell>
                          <TableCell align="right">Price</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {products.map((product) => {
                          return (
                            <TableRow
                              key={product.id}
                              sx={{
                                '&:last-child td, &:last-child th': {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                <Link
                                  to={`/admin/products/${product.id}`}
                                  style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                  }}
                                >
                                  <img
                                    src={product.imageURL}
                                    id="admin-products-view"
                                  />
                                </Link>
                              </TableCell>
                              <TableCell align="right">
                                {product.title}
                              </TableCell>
                              <TableCell align="right">
                                {product.description}
                              </TableCell>
                              <TableCell align="right">
                                {product.price}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </Grid>
              <Copyright />
            </ThemeProvider>
          </div>
        )}
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

export default connect(mapState, mapDispatch)(AdminAllProducts);
