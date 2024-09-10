import React, { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { loginUser } from '../../actions';

const Login = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(props.isAuthenticated){
            navigate('/dashboard');
        };
    }, [props.isAuthenticated, navigate]);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const{email, password} = formData;

    const onFormChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const onFormSubmit = e =>{
        e.preventDefault();
        props.loginUser({email, password});
    }

    return (    
        <React.Fragment>
            <Navbar />
            <div className="container">
                <h1 className="large text-primary">Beautician/Stylist Login</h1>
                <p className="lead">Sign into Your Account</p>
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <input
                            className="w-auto my-1"
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={email}
                            onChange={(e) => onFormChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            className="w-auto my-1"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => onFormChange(e)}
                            required
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
                <p className="my-1">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </React.Fragment>
    )
};

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    loginUser: PropTypes.func
};
Login.defaultProps = {
    isAuthenticated: false
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        loginUser: (data) => {
            dispatch(loginUser(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

