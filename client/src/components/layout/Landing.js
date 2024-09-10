import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar';

import { connect } from 'react-redux';

const Landing = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(props.isAuthenticated){
            navigate('/dashboard');
        };
    }, [props.isAuthenticated, navigate]);

    return (
        <React.Fragment>        
            <Navbar />            
            <section className="landing">
                <div className="dark-overlay">
                    <div className="landing-inner">
                    <h1 className="x-large">Style & Shine Beauty Connect</h1>
                    <p className="lead">
                        Create a Beautician/Stylist profile, share beauty blogs and get connected with customers and other peers in your industry
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
};

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
};

Landing.defaultProps = {
    isAuthenticated: false
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
    };
};

export default connect(mapStateToProps, null)(Landing);

