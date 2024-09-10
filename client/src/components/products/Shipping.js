import React, { useEffect, useState } from 'react';
import Navbar from '../layout/Navbar';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import FormContainer from './FormContainer';
import CheckoutSteps from './CheckoutSteps';
import { saveShippingAddress } from '../../actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Shipping = (props) => {
    const cart = props.cart;
    const { shippingAddress } = cart;
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();
    const [shippingAddressSaved, setShippingAddressSaved] = useState(false);

    useEffect(() => {
        if(shippingAddressSaved === true){
            navigate('/payment');
        };
    }, [shippingAddressSaved, navigate]);
    
    useEffect(() => {
        if(cart.cartItems && cart.cartItems.length === 0){
            navigate('/customer-products');
        };
    }, [cart, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        props.saveShippingAddress(formData);    
        setShippingAddressSaved(true);
    };

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value });

    return (
        <React.Fragment>
            <Navbar />
            <section className="container">
                <CheckoutSteps step1 />
                <FormContainer>
                    <h1 className="text-primary">Customer Details & Shipping Address</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter Name'
                                name="name"
                                value={formData.name ? formData.name : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                name="email"
                                value={formData.email ? formData.email : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
                        </Form.Group>
                        <hr/>
                        <Form.Group>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter address'
                                name="address" 
                                value={formData.address ? formData.address : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
                        </Form.Group>
                
                        <Form.Group>
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter city'
                                name="city" 
                                value={formData.city ? formData.city : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
                        </Form.Group>
                
                        <Form.Group>
                            <Form.Label>Postal Code</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter postal code'
                                name="postalCode" 
                                value={formData.postalCode ? formData.postalCode : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
                        </Form.Group>
                
                        <Form.Group>
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter country'
                                name="country" 
                                value={formData.country ? formData.country : ''} 
                                required
                                onChange={e=> onChange(e)} 
                            ></Form.Control>
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

Shipping.propTypes = {
    cart: PropTypes.object,
    saveShippingAddress: PropTypes.func
};

Shipping.defaultProps = {
    cart: {},
};

const mapStateToProps = (state) => ({
    cart: state.MainApplicationReducers.CartReducer,
});

const mapDispatchToProps = (dispatch) =>{
    return{
        saveShippingAddress: (data) => {
          dispatch(saveShippingAddress(data));
        },
    };
};
  
export default connect(mapStateToProps, mapDispatchToProps)(Shipping);
