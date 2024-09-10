import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Rating from './Rating';
import { Card } from 'react-bootstrap';

const Product = (props) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    if(props.product){
      setProduct(props.product);
    }
  }, [props.product]);

  return (
    <React.Fragment>
      <Card className='my-3 p-3 rounded'>
        <Link to={`/more-product-details/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>

        <Card.Body>
          <Link to={`/more-product-details/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>

          <Card.Text as='div'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as='h3'>£{product.price}</Card.Text>
          <Link to={`/more-product-details/${product._id}`}className="btn btn-primary m-1">More Details</Link>
        </Card.Body>
      </Card>
    </React.Fragment>
  )
}

Product.propTypes = {
  product: PropTypes.object,
  productReviewCreate: PropTypes.object,
};

Product.defaultProps = {
  productReviewCreate: {}
};

const mapStateToProps = (state) => ({
  productReviewCreate: state.MainApplicationReducers.productReviewCreateReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    createProductReview: (productId, review) => {
          dispatch(createProductReview(productId, review));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Product);

