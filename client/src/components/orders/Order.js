import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Card, Image, Row, Col, ListGroup, Button } from 'react-bootstrap';
import Message from '../products/Message';
import { Link } from 'react-router-dom';
import { deliverOrderByID } from '../../actions';

const Order = (props) => {
    const deliverHandler = () => {
        props.deliverOrderByID(props.order._id);
    };

  return (
    <React.Fragment>
        <Row>
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
                    {props.order.isPaid &&
                        !props.order.isDelivered && (
                        <ListGroup.Item>
                            <Button
                            type='button'
                            className='btn btn-block'
                            onClick={deliverHandler}
                            >
                            Mark As Delivered
                            </Button>
                        </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </React.Fragment>
  )
};

Order.propTypes = {
};

Order.defaultProps = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) =>{
  return{
    deliverOrderByID: (id) => {
        dispatch(deliverOrderByID(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

