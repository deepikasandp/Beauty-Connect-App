import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../../actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const ProductCarousel = (props) => {
  const { loading, error, products } = props.productTopRated;

  useEffect(() => {
    props.listTopProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products && products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
};

ProductCarousel.propTypes = {
  listTopProducts: PropTypes.func,
  productTopRated: PropTypes.object
};

ProductCarousel.defaultProps = {
  productTopRated: {}
};

const mapStateToProps = (state) => ({
  productTopRated: state.MainApplicationReducers.productTopRatedReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    listTopProducts: () => {
          dispatch(listTopProducts());
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCarousel);
