import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Order from './Order';
import { listMyOrders } from '../../actions';
import { useNavigate } from 'react-router-dom';

const ViewOrders = (props, match) => {
  const navigate = useNavigate();
  const [orderList, setOrderList] = useState({});

  useEffect(() => {
    props.listMyOrders();
  }, []);
  
  useEffect(() => {
    if(props.orderList && !props.orderList.loading && props.orderList.orders && props.orderList.orders.length > 0){
        setOrderList(props.orderList);
    }
  }, [props.orderList]);   

  useEffect(() => {
    if(!props.isAuthenticated){
        navigate('/login');
    };
  }, [props.isAuthenticated, navigate]);

  return (
    <React.Fragment>
      <Navbar />
      <section className='container'>
        <h1 className="large text-primary">Orders</h1>
          <React.Fragment>
            <Row>
              {orderList.orders && orderList.orders.map((order) => (
                <Col key={order._id} sm={12} md={12} lg={12} xl={12}>
                  <Order order={order} />
                </Col>
              ))}
            </Row>
          </React.Fragment>
      </section>
    </React.Fragment>
  )
};

ViewOrders.propTypes = {
    listOrders: PropTypes.func,
    orderList: PropTypes.object,
    isAuthenticated: PropTypes.bool,
};

ViewOrders.defaultProps = {
    orderList: {}
};

const mapStateToProps = (state) => ({
    orderList: state.MainApplicationReducers.orderListMyReducer,
    isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
});

const mapDispatchToProps = (dispatch) =>{
  return{
    listMyOrders: () => {
          dispatch(listMyOrders());
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewOrders);
