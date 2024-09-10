import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';
import { Link, useNavigate } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { registerUser } from '../../actions';

const RegisterCustomer = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(props.isAuthenticated){
            navigate('/dashboard');
        };
    }, [props.isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const{name, email, password, password2} = formData;

    const onFormChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onFormSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            console.log('Password do not match!');
        }else{
            props.registerUser({name, email, password});
        }
    };

    return (
        <React.Fragment>     
            <Navbar />
            <section className="container">
                <h1 className="large text-primary">Customer Registration</h1>
                <p className="lead">Create Your Account</p>
                <form className="form" onSubmit={e => onFormSubmit(e)}>
                    <div className="form-group">
                        <input 
                        type="text" 
                        placeholder="Name" 
                        name="name" 
                        value={name}
                        required 
                        onChange={(e) => onFormChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email"                        
                        value={email} 
                        required
                        onChange={(e) => onFormChange(e)}
                        />
                            <small className="form-text">
                                This site uses Gravatar so if you want a profile image, use a
                                Gravatar email
                            </small>
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"                        
                        value={password}
                        required
                        onChange={(e) => onFormChange(e)}
                        />
                    </div>
                    <div className="form-group">
                        <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"                        
                        value={password2}
                        required
                        onChange={(e) => onFormChange(e)}
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>
                <p className="my-1">
                    Already have an account? <Link to="/login">Sign In</Link>
                </p>
            </section>
        </React.Fragment>
    )
};

RegisterCustomer.propTypes = {
    isAuthenticated: PropTypes.bool,
    registerUser: PropTypes.func
};
RegisterCustomer.defaultProps = {
    isAuthenticated: false
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        registerUser: (data) => {
            dispatch(registerUser(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterCustomer);
