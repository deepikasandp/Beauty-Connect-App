import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Message from '../products/Message';
import Loader from '../products/Loader';
import Paginate from '../products/Paginate';
import { listProducts, deleteProduct } from '../../actions';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from '../products/Rating';

const DisplayProducts = (props, match) => {
  const [productList, setProductList] = useState({});
  const keyword = match && match.params ? match.params.keyword : '';
  const pageNumber = match && match.params ? match.params.pageNumber || 1 : 0;
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    props.listProducts(keyword, pageNumber);
  }, [keyword, pageNumber]);

  useEffect(() => {
    if(props.productList && !props.productList.loading && props.productList.products && props.productList.products.length > 0){      
      const newList = [];
      props.productList.products.map((product) => {
        if(product.user === props.userId){
          newList.push(product);
        }
      });
      setProductList(newList);
    }
  }, [props.productList]);
  
  const handleDelete = (e) => {
    const id = e.target.id;
    if (id && window.confirm('Are you sure you want to delete the product listing?')) {
        props.deleteProduct(id);
    }
  };

  const showProduct = (product) => {
      return(
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

                <Card.Text as='h3'>${product.price}</Card.Text>
                <button className="btn btn-danger" id={product._id} onClick={(e) => handleDelete(e)}>Delete</button>
                <Link to={`/edit-product/${product._id}`} className="btn btn-primary m-1">Edit</Link>
              </Card.Body>
            </Card>
        </React.Fragment>
      );
  };

  return (
    <React.Fragment>    
        <section className="container border">
            <h2 className="mt-2">Your Product Listings</h2>
            {loading ? (
                <Loader />
            ) : productList.error ? (
                <Message variant='danger'>{productList.error}</Message>
            ) : (
                <React.Fragment>
                  <Row>
                      {productList && productList.length > 0 ? productList.map((product) => (
                          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                              {showProduct(product)}
                          </Col>
                      )) : <Message>No Products Listed</Message>}
                  </Row>
                  <Paginate
                      pages={productList.pages}
                      page={productList.page}
                      keyword={keyword ? keyword : ''}
                  />
                </React.Fragment>
            )}
        </section>
    </React.Fragment>
  )
};

DisplayProducts.propTypes = {
  listProducts: PropTypes.func,
  productList: PropTypes.object
};

DisplayProducts.defaultProps = {
  productList: {}
};

const mapStateToProps = (state) => ({
  productList: state.MainApplicationReducers.productListReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    listProducts: (keyword, pageNumber) => {
        dispatch(listProducts(keyword, pageNumber));
    },    
    deleteProduct: (id) => {
        dispatch(deleteProduct(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayProducts);
