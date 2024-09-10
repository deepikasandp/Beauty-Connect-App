import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate  } from 'react-router-dom';
import Navbar from '../layout/Navbar';

import { connect } from 'react-redux';
import { getProfile, deleteAccount } from '../../actions';
import DashboardActions from './DashboardActions';
import DisplayExperience from './DisplayExperience';
import DisplayEducation from './DisplayEducation';
import DisplayProducts from './DisplayProducts';

const Dashboard = (props) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState({});
    const [user, setUser] = useState({});

    useEffect(() => {
        if(!props.loading && props.isAuthenticated){
            props.getProfile();
        }
    }, [props.loading, props.isAuthenticated]);

    useEffect(() => {
        if(!props.isAuthenticated){
            navigate('/login');
        };
    }, [props.isAuthenticated, navigate]);

    useEffect(() => {
        if(props.profile && Object.keys(props.profile).length !== 0){
            setProfile(props.profile);
            if(props.profile.user)
                setUser(props.profile.user);
        }
    }, [props.profile]);
    
    const handleDelete = () => {
        props.deleteAccount();
    };
    
    return (
        <React.Fragment>     
            <Navbar />        
            <section className="container">
                <h1 className="large text-primary mt-2 mb-2">Dashboard</h1>
                <p className="lead">
                    Welcome {user && user.name}
                </p>
                {profile && Object.keys(profile).length !== 0 ? 
                    <React.Fragment>
                        <DashboardActions />
                        <hr />
                        <DisplayExperience experience={profile.experience}/>
                        <DisplayEducation education={profile.education} />
                        <DisplayProducts userId={user._id}/>
                        <div className="my-2">
                            <button className="btn btn-danger" onClick={()=>handleDelete()}>
                                <i className="fas fa-user"></i>&nbsp;Delete My Account
                            </button>
                        </div>
                    </React.Fragment>
                    :
                    <Fragment>
                        <p>You have not yet setup your profile</p>
                        <Link to="/createProfile" className="btn btn-primary my-1">
                            Create Profile
                        </Link>
                    </Fragment>
                }
            </section>
        </React.Fragment>
    )
};

Dashboard.propTypes = {
    isAuthenticated: PropTypes.bool,
    profile: PropTypes.object,
    getProfile: PropTypes.func,
    deleteAccount: PropTypes.func,
    userId: PropTypes.object,
};

Dashboard.defaultProps = {
    profile: {}
};

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
        loading: state.MainApplicationReducers.AuthReducer.loading,
        profile: state.MainApplicationReducers.ProfileReducer.profile,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getProfile: () => {
            dispatch(getProfile());
        },
        deleteAccount: () => {
            dispatch(deleteAccount());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

