import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Rating from './Rating';
import { Row, Col, Image, ListGroup, Card, Button, Form, PopoverBody } from 'react-bootstrap';
import Message from './Message';
import { Link, useParams } from 'react-router-dom';
import { listProductDetails, createProductReview, addToCart } from '../../actions';

const MoreDetails = (props) => {
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [product, setProduct] = useState({});
  const [addToCartStatus, setAddToCartStatus] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if(id)
      props.listProductDetails(id);
  }, []);

  useEffect(() => {
    if(props.productDetails && !props.productDetails.loading && props.productDetails.product){
      setProduct(props.productDetails.product);
    }
  }, [props.productDetails]);

  useEffect(() => {
    if(addToCartStatus === true){
      setTimeout(() => {
        setAddToCartStatus(false);
      }, 1000);
    }
  }, [addToCartStatus]);

  const submitHandler = (e) => {
    e.preventDefault();
    props.createProductReview(id, {
      name,
      rating,
      comment,
    });
  }

  const reset = () => {
    // setName('');
    // setRating(0);
    // setComment('');
    return(
      <React.Fragment>
        <p>Review submitted successfully</p>
    </React.Fragment>
    );
  };

  const addToCartHandler = () => {
    const data = {
      agent: product.user,
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: qty,
    };
    props.addToCart(data);
    setAddToCartStatus(true);
  };
  
  return (
    <React.Fragment>
      <Navbar />      
      <Link className="m-1" to="/customer-products">Go Back</Link>
      {addToCartStatus && (
        <Message variant='success'> 
          <p>Item added to cart successfully</p>
        </Message>
      )}      
      <section className="container">
        <Row>
          <Col md={3}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={` ${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: £{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>£{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews && product.reviews.length === 0 && <Message>No Reviews</Message>}
            <ListGroup variant='flush'>
              {product.reviews && product.reviews.length !== 0 && product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a Customer Review</h2>
                {props.productReviewCreate && props.productReviewCreate.success && (
                  <Message variant='success'> {reset()}
                  </Message>
                )}
                {props.productReviewCreate && props.productReviewCreate.error && (
                  <Message variant='danger'>{props.productReviewCreate && props.productReviewCreate.error}</Message>
                )}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                      <Form.Label>Name</Form.Label>
                      <small className="form-text"> (optional)</small>
                      <Form.Control
                        type="text" 
                        row='3'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='rating'>
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as='select'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1 - Poor</option>
                        <option value='2'>2 - Fair</option>
                        <option value='3'>3 - Good</option>
                        <option value='4'>4 - Very Good</option>
                        <option value='5'>5 - Excellent</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='comment'>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control
                        as='textarea'
                        row='3'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={props.productReviewCreate.loading}
                      type='submit'
                      variant='primary'
                      className='m-1'
                    >
                      Submit
                    </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </section>
    </React.Fragment>
  )
}

MoreDetails.propTypes = {
  product: PropTypes.object,
  productReviewCreate: PropTypes.object,
  productDetails: PropTypes.object,
  addToCart: PropTypes.func
};

MoreDetails.defaultProps = {
  product: {},
  productReviewCreate: {},
  productDetails: {},
};

const mapStateToProps = (state) => ({
  productReviewCreate: state.MainApplicationReducers.productReviewCreateReducer,
  productDetails: state.MainApplicationReducers.productDetailsReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    createProductReview: (productId, reviewObj) => {
      dispatch(createProductReview(productId, reviewObj));
    },
    listProductDetails: (id) => {
      dispatch(listProductDetails(id));
    },
    addToCart: (data) => {
        dispatch(addToCart(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreDetails);

