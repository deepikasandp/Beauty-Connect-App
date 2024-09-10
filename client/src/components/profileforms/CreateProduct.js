import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; 
import { Row, Col } from 'react-bootstrap'; 

import { connect } from 'react-redux';
import { createProduct, loadUser } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';

const CreateProduct = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.loadUser();
    }, [props]);

    useEffect(() => {
        if(!props.isAuthenticated){
            navigate('/login');
        };
    }, [props.isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image: '/images/sample.jpg',
        brand: false,
        category: '',
        countInStock: '',
        description: '',
        rating: 0
    });
    
    const {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        rating
    } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]:e.target.value });    

    const onFormSubmit = e =>{
        e.preventDefault();
        props.createProduct(formData);
    };
    
    return (
        <React.Fragment>
            <AlertContainer />
            <Navbar /> 
            <section className="container">
                <h1 className="large text-primary">
                    Create A Product
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Create a product that you would like to sell
                </p>
                <small>* = required field</small>                
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* name" 
                            name="name" 
                            value={name ? name : ''} 
                            onChange={e=> onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col>
                                £{' '}
                                <input 
                                    type="number" 
                                    placeholder="* price in GBP" 
                                    name="price"
                                    min="1"
                                    step="any"
                                    value={price ? price : ''} 
                                    onChange={e=> onChange(e)}  
                                    required 
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <Row>
                            <Col className="col-2">
                                <label className="mr-1">Product Image</label>
                            </Col>
                            <Col>
                                <input
                                    className="border border-primary"
                                    type="image" 
                                    name="image"
                                    src={image ? image : ''} 
                                    alt="Sample Image" 
                                    width="100"
                                    height="100"
                                    onChange={e=> onChange(e)}  
                                    required 
                                />
                            </Col>
                        </Row>
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* brand" 
                            name="brand" 
                            value={brand ? brand : ''} 
                            onChange={e=> onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* category" 
                            name="category" 
                            value={category ? category : ''} 
                            onChange={e=> onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="number" 
                            placeholder="* count in stock" 
                            name="countInStock"
                            value={countInStock ? countInStock : ''} 
                            onChange={e=> onChange(e)}  
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="* description"
                            value={description ? description : ''} 
                            onChange={e=> onChange(e)} 
                        ></textarea>
                    </div>
                    <input 
                        type="submit" 
                        className="btn btn-primary my-1" 
                    />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </React.Fragment>
    )
};

CreateProduct.propTypes = {
    isAuthenticated: PropTypes.bool,
    createProduct: PropTypes.func,
};

CreateProduct.defaultProps = {
    isAuthenticated: false
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated
});

const mapDispatchToProps = (dispatch) =>{
    return{
        createProduct: (data) => {
            dispatch(createProduct(data));
        },
        loadUser: () => {
            dispatch(loadUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct);