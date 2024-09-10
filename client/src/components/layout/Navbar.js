import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faUserPen, faUserCheck } from '@fortawesome/free-solid-svg-icons';

const Navbar = (props) => {
    const {isAuthenticated, loading} = props.authData;
    
    const AuthLinks = () => {
        return (
            <Fragment>
                <ul className="mt-2">
                    <li>
                        <Link to="/profiles" className="text-decoration-none fs-5">
                            <i className="fas fa-users"></i>
                            <span className="hide-sm">{' '}Beautician/Stylist</span>                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/posts" className="text-decoration-none fs-5">
                            <i className="fa fa-clipboard"></i>
                            <span className="hide-sm">{' '}Posts</span>                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer-products" className="text-decoration-none fs-5">
                            <i className="fas fa-store"></i>
                            <span className="hide-sm">{' '}Products</span>                            
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard" className="text-decoration-none fs-5">
                            <i className="fas fa-user"></i>
                            <span className="hide-sm">{' '}Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/logout"className="text-decoration-none fs-5">
                            <i className="fas fa-sign-out-alt"></i>
                            <span className="hide-sm">{' '}Logout</span>
                        </Link>
                    </li>
                </ul>
            </Fragment>
        );
    };

    const GuestLinks = () => {
        return (
            <Fragment>
                <ul className="mt-2">
                    <li>
                        <Link to="/profiles" className="text-decoration-none fs-5">
                        <i className="fas fa-users"></i>{' '}Beautician/Stylist
                        </Link>
                    </li>
                    <li>
                        <Link to="/public-posts" className="text-decoration-none fs-5"><FontAwesomeIcon icon={faStickyNote} />{' '}Posts
                        </Link>
                    </li>
                    <li>
                        <Link to="/customer-products" className="text-decoration-none fs-5"><i className="fas fa-store"></i>{' '}Products</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-decoration-none fs-5"><i className="fas fa-shopping-cart"></i>{' '}Cart</Link>
                    </li>
                    <li>
                        <Link to="/register" className="text-decoration-none fs-5"><FontAwesomeIcon icon={faUserPen} />{' '}Register
                        </Link>
                    </li>
                    <li>
                        <Link to="/login" className="text-decoration-none fs-5"><FontAwesomeIcon icon={faUserCheck} />{' '}Login
                        </Link>
                    </li>
                </ul>
            </Fragment>
        );
    };

    return (
        <nav className="navbar bg-dark">
            <Link to="/" className="text-decoration-none fs-3">
                <i className="fas fa-spa"></i> Style & Shine Beauty Connect
            </Link>
            {!loading && (isAuthenticated ? <AuthLinks/> : <GuestLinks/>)}
        </nav>
    )
};

Navbar.propTypes = {
    authData: PropTypes.object,
    logoutUser: PropTypes.func
};
Navbar.defaultProps = {
    authData: {}
}

const mapStateToProps = (state) => {
    return{
        authData: state.MainApplicationReducers.AuthReducer,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        logoutUser: () => {
            dispatch(logoutUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

