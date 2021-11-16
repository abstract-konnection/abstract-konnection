import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItems, removeCartItems } from '../store/cart';
import { fetchOpenCartItems } from '../store/dbCartItems';
import { Link } from 'react-router-dom';

export default function Cart(props) {
  const id = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cartItem);
  const dbCart = useSelector((state) => state.dbCartItems);
  const openOrder = useSelector((state) => state.openOrder);
  const { cartItems } = cart;
  const dispatch = useDispatch();

  const removeFromCart = (id) => {
    dispatch(removeCartItems(id));
  };
  useEffect(() => {
    dispatch(fetchOpenCartItems(openOrder.id));
  }, []);

  const productData = dbCart.length ? dbCart : cartItems;
  /* the productId on cartItems is assigned to the key product 
	and assigned productId on dbCart. Ne need to standardize it 
	here to generalize it in code */
  const productId = dbCart.length ? 'productId' : 'product';
  console.log('i am the product', productData[0].productId);

  return (
    <div>
      <div>
        <h1>Your Cart</h1>
        {productData.length === 0 ? (
          <div>
            <h3>Your cart is currently empty.</h3>
            <Link to="/">Go to Products</Link>
          </div>
        ) : (
          <ul>
            {productData.map((item) => (
              <li key={item.productId}>
                <div>
                  <div>
                    <img src={item.imageURL} alt={item.title}></img>
                  </div>
                  <div>
                    <Link to={`/products/${item.productId}`}>{item.title}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addCartItems(item.productId, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.quantity).keys()].map((e) => (
                        <option key={e + 1} value={e + 1}>
                          {e + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>Price: ${item.price}</div>
                  <button onClick={() => removeFromCart(item.productId)}>
                    Remove From Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <div>
          <ul>
            <li>
              <h2>
                Subtotal ({productData.reduce((a, c) => a + Number(c.qty), 0)}{' '}
                items) : ${productData.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <Link to={'/checkout'}>
                <button type="button" disabled={productData.length === 0}>
                  Proceed to Checkout
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
