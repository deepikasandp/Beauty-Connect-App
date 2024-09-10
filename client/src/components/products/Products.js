import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from './Product';
import Message from './Message';
import Loader from './Loader';
import Paginate from './Paginate';
import { listProducts } from '../../actions';

const Products = (props, match) => {
  const [productList, setProductList] = useState({});
  const keyword = match && match.params ? match.params.keyword : '';
  const pageNumber = match && match.params ? match.params.pageNumber || 1 : 0;
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    props.listProducts(keyword, pageNumber);
  }, [keyword, pageNumber]);
  
  useEffect(() => {
    if(props.productList && !props.productList.loading && props.productList.products && props.productList.products.length > 0){
      setProductList(props.productList);
    }
  }, [props.productList]);

  return (
    <React.Fragment>
      <Navbar />      
      <section className="container">
        <h1 className="large text-primary">Latest Products</h1>
        <p className="lead">Browse our latest products</p>
        {loading ? (
          <Loader />
        ) : productList.error ? (
          <Message variant='danger'>{productList.error}</Message>
        ) : (
          <React.Fragment>
            <Row>
              {productList.products && productList.products.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
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

Products.propTypes = {
  listProducts: PropTypes.func,
  productList: PropTypes.object
};

Products.defaultProps = {
  productList: {}
};

const mapStateToProps = (state) => ({
  productList: state.MainApplicationReducers.productListReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    listProducts: (keyword, pageNumber) => {
          dispatch(listProducts(keyword, pageNumber));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);
