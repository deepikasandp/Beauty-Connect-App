import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Modal, Button } from 'react-bootstrap';
import FormContainer from './FormContainer';
import CheckoutSteps from './CheckoutSteps';
import OrderConfirmationModal from './OrderConfirmationModal';
import Message from './Message';
import { createOrder, clearOrderReset, clearCartItems } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const PlaceOrder = (props) => {
    const cart = props.cart;
    const navigate = useNavigate();
    const { error, success, order } = props.orderCreate;
    const [modalShow, setModalShow] = useState(false);
    
    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if (!cart.paymentMethod) {
            navigate('/payment');
        };
    }, [cart, navigate]);

    useEffect(() => {
        if (success) {
            navigate(`/order/${order._id}`);
            props.clearCartItems();
            props.clearOrderReset();
        }
    }, [success]);

    const redirect = () => {
        setModalShow(false);
        navigate(`/customer-products`);
    }
    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    };

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
    cart.shippingPrice = addDecimals(cart.itemsPrice > 25 ? 0 : 25);
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2);

    const placeOrderHandler = () => {
        const data = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        };
        props.createOrder(data);
    };

    return (
        <React.Fragment>
            <Navbar />
            <section className="container">
                <CheckoutSteps step1 step2 step3 />
                <FormContainer>
                    <h1 className="text-primary">Place Order</h1>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Customer Details</h2>
                                    <p>
                                        <strong>Name: </strong>
                                        {cart.shippingAddress.name}
                                    </p>
                                    <p>
                                        <strong>Email: </strong>
                                        {cart.shippingAddress.email}
                                    </p>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h2>Shipping Address</h2>
                                    <p>
                                        <strong>Address: </strong>
                                        {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                                        {cart.shippingAddress.postalCode},{' '}
                                        {cart.shippingAddress.country}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <strong>Method: </strong>
                                {cart.paymentMethod}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                <h2>Order Items</h2>
                                {cart.cartItems.length === 0 ? (
                                    <Message>Your cart is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                        <Row>
                                            <Col>
                                                <Image
                                                src={item.image}
                                                alt={item.name}
                                                fluid
                                                rounded
                                                />
                                            </Col>
                                            <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x £{item.price} = £{item.qty * item.price}
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>
                                    ))}
                                    </ListGroup>
                                )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={4}>
                            <Card>
                                <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h2>Order Summary</h2>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Items</Col>
                                    <Col>£{cart.itemsPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Shipping</Col>
                                    <Col>£{cart.shippingPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Tax</Col>
                                    <Col>£{cart.taxPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                    <Col>Total</Col>
                                    <Col>£{cart.totalPrice}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Button
                                    type='button'
                                    className='btn-block'
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                    >
                                    Place Order
                                    </Button>
                                </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </FormContainer>
            </section>       
            <OrderConfirmationModal
                show={modalShow}
                onHide={() => redirect()}
                contact={cart.shippingAddress && cart.shippingAddress.email}
            />
        </React.Fragment>
    )
};

PlaceOrder.propTypes = {
    cart: PropTypes.object,
    createOrder: PropTypes.func,
    clearCartItems: PropTypes.func,
    clearOrderReset: PropTypes.func,
    clearOrder: PropTypes.func
};

PlaceOrder.defaultProps = {
    cart: {},
};

const mapStateToProps = (state) => ({
    cart: state.MainApplicationReducers.CartReducer,
    orderCreate: state.MainApplicationReducers.orderCreateReducer
});

const mapDispatchToProps = (dispatch) =>{
    return{
        createOrder: (data) => {
          dispatch(createOrder(data));
        },
        clearCartItems: () => {
          dispatch(clearCartItems());
        },
        clearOrderReset: () => {
          dispatch(clearOrderReset());
        },
        clearOrder: () => {
          dispatch(clearOrder());
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrder);
