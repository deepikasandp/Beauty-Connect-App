import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { Col, Form, Button } from 'react-bootstrap';
import FormContainer from './FormContainer';
import CheckoutSteps from './CheckoutSteps';
import { savePaymentMethod } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Payment = (props) => {
    const cart = props.cart;
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping');
        };
    }, [shippingAddress, navigate]);

    const submitHandler = (e) => {
        e.preventDefault()
        props.savePaymentMethod(paymentMethod);
        navigate('/placeOrder');
    };

    return (
        <React.Fragment>
            <Navbar />
            <section className="container">
                <CheckoutSteps step1 step2 />
                <FormContainer>
                    <h1 className="text-primary">Payment Method</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                        <Form.Label as='legend'>Select Method</Form.Label>
                        <Col>
                            <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check>
                            {/* <Form.Check
                            type='radio'
                            label='Stripe'
                            id='Stripe'
                            name='paymentMethod'
                            value='Stripe'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            ></Form.Check> */}
                        </Col>
                        </Form.Group>

                        <Button type='submit' variant='primary' className='mt-2'>
                        Continue
                        </Button>
                    </Form>
                </FormContainer>
            </section>
        </React.Fragment>
    )
}

Payment.propTypes = {
    cart: PropTypes.object,
    savePaymentMethod: PropTypes.func
};

Payment.defaultProps = {
    cart: {},
};

const mapStateToProps = (state) => ({
    cart: state.MainApplicationReducers.CartReducer,
});

const mapDispatchToProps = (dispatch) =>{
    return{
        savePaymentMethod: (data) => {
          dispatch(savePaymentMethod(data));
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Payment);

