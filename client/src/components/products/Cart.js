import React from 'react';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from './Message';
import { addToCart, removeFromCart } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Cart = (props) => {
  const { cartItems } = props.cart;

  const removeFromCartHandler = (id) => {
    props.removeFromCart(id);
  };

  const updateCart = (item, qty) => {
    const data = {
      agent: item.user,
      product: item._id,
      name: item.name,
      image: item.image,
      price: item.price,
      countInStock: item.countInStock,
      qty: qty,
    };
    props.addToCart(data);
  };
  
  return (
    <React.Fragment>
      <Navbar />      
      <section className="container">
        <h1 className="large text-primary">Shopping Cart</h1>
        <p className="lead">Review your shopping cart</p>
        {cartItems && cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to='/customer-products'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems && cartItems.length !== 0 && cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>£{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={(e) =>
                        updateCart(item, Number(e.target.value)
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </section>
      <section className="container">      
        {cartItems && cartItems.length !== 0 &&
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems && cartItems.length !== 0 && cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  items
                </h2>
                £
                {cartItems && cartItems.length !== 0 && cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </ListGroup.Item>
              <ListGroup.Item>              
                <Link to="/shipping" className="btn btn-primary" 
                disabled={cartItems && cartItems.length === 0}>
                  Proceed To Checkout
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        }
      </section>
    </React.Fragment>
  )
}

Cart.propTypes = {
    cart: PropTypes.object,
};

Cart.defaultProps = {
    cart: {},
};

const mapStateToProps = (state) => ({
    cart: state.MainApplicationReducers.CartReducer,
});

const mapDispatchToProps = (dispatch) =>{
    return{
        addToCart: (data) => {
          dispatch(addToCart(data));
        },
        removeFromCart: (id) => {
          dispatch(removeFromCart(id));
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
