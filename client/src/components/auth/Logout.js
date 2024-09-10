import { useEffect } from 'react'
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { logoutUser, clearProfile } from '../../actions';
import { useNavigate } from 'react-router-dom';

const Logout = (props) => {
    const navigate = useNavigate();
    useEffect(() => {
        props.logoutUser();
    }, [props]);

    useEffect(() => {
        if(!props.isAuthenticated){
            navigate('/');
        };
    }, [props.isAuthenticated, navigate]);

    return null;
};

Logout.propTypes = {
    isAuthenticated: PropTypes.bool,
    logoutUser: PropTypes.func,
    clearProfile: PropTypes.func
};

Logout.defaultProps = {
    isAuthenticated: false
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        logoutUser: (data) => {
            dispatch(logoutUser(data));
            dispatch(clearProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);

