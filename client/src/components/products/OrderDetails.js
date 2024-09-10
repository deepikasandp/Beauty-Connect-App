import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Message from '../products/Message';
import { Link, useParams } from 'react-router-dom';
import { PayPalButton } from 'react-paypal-button-v2';
import { getOrderByID, payOrderByID } from '../../actions';
import Loader from './Loader';

const OrderDetails = (props) => {
    const { id } = useParams();
    const [sdkReady, setSdkReady] = useState(false);
    const { loading: loadingPay, success: successPay, error: errorPay } = props.orderPay;

    useEffect(() => {
        props.getOrderByID(id);
    }, []);

    useEffect(() => {    
        const addPayPalScript = async () => {
          const { data: clientId } = await axios.get('http://localhost:5000/api/orders/config/paypal');
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
          script.async = true;
          script.onload = () => {
            setSdkReady(true);
          };
          document.body.appendChild(script);
        }
    
        if (!props.order || successPay) {
            props.getOrderByID(id);
        } else if (!props.order.isPaid) {
            if (!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
      }, [successPay, props.order]);
    
    const successPaymentHandler = (paymentResult) => {
        props.payOrderByID(id, paymentResult);
    };

    const deliverHandler = () => {
        props.deliverOrderByID(id);
    };

    return (
        <React.Fragment>        
            <Navbar />
            <Row>
                {props.order && props.order.shippingAddress &&
                    <React.Fragment>
                        <Col>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> {props.order.shippingAddress.name}
                                </p>
                                <p>
                                    <strong>Email: </strong>{' '}
                                    <a href={`mailto:${props.order.shippingAddress.email}`}>{props.order.shippingAddress.email}</a>
                                </p>
                                <p>
                                    <strong>Address:</strong>
                                    {props.order.shippingAddress.address}, {props.order.shippingAddress.city}{' '}
                                    {props.order.shippingAddress.postalCode},{' '}
                                    {props.order.shippingAddress.country}
                                </p>
                                {props.order.isDelivered ? (
                                    <Message variant='success'>
                                    Delivered on {props.order.deliveredAt}
                                    </Message>
                                ) : (
                                    <Message variant='danger'>Not Delivered</Message>
                                )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                <h2>Payment Method</h2>
                                <p>
                                    <strong>Method: </strong>
                                    {props.order.paymentMethod}
                                </p>
                                {props.order.isPaid ? (
                                    <Message variant='success'>Paid on {props.order.paidAt}</Message>
                                ) : (
                                    <Message variant='danger'>Not Paid</Message>
                                )}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                <h2>Order Items</h2>
                                {props.order.orderItems.length === 0 ? (
                                    <Message>Order is empty</Message>
                                ) : (
                                    <ListGroup variant='flush'>
                                    {props.order.orderItems.map((item, index) => (
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
                                            <Link to={`/more-product-details/${item.product}`}>
                                                {item.name}
                                            </Link>
                                            </Col>
                                            <Col md={4}>
                                            {item.qty} x ${item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                        </ListGroup.Item>
                                    ))}
                                    </ListGroup>
                                )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <h2>Order Summary</h2>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Items</Col>
                                        <Col>${props.order.itemsPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Shipping</Col>
                                        <Col>${props.order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Tax</Col>
                                        <Col>${props.order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                        <Col>Total</Col>
                                        <Col>${props.order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {!props.order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            <PayPalButton
                                                amount={props.order.totalPrice}
                                                onSuccess={successPaymentHandler}
                                            />
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </React.Fragment>
                }
            </Row>
        </React.Fragment>
    );
};

OrderDetails.propTypes = {
    order: PropTypes.object,
    orderPay: PropTypes.object,
};

OrderDetails.defaultProps = {
    order: {},
    orderPay: {}
};

const mapStateToProps = (state) => ({
    order: state.MainApplicationReducers.orderDetailsReducer.order,
    orderPay: state.MainApplicationReducers.orderPayReducer,
});

const mapDispatchToProps = (dispatch) =>{
  return{
    getOrderByID: (id) => {
        dispatch(getOrderByID(id));
    },
    payOrderByID: (id, data) => {
        dispatch(payOrderByID(id, data));
    },
    deliverOrderByID: (id) => {
        dispatch(deliverOrderByID(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetails);

