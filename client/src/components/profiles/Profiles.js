import React, {useEffect} from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../actions';
import ProfileItem from './ProfileItem';
import { Container } from 'react-bootstrap';

const Profiles = (props) => {
    useEffect(() => {
        props.getAllProfiles();
    }, []);

    return (
        <React.Fragment>
            <Navbar />
            <Container>
                <h1 className="large text-primary">Beautician and Stylist</h1>
                <p className="lead">Browse and connect with Beautician and Stylist</p>
                <div className="container">
                    {props.profiles && props.profiles.length > 0 ? (
                        props.profiles.map(profile => (
                            <ProfileItem key={profile._id} profile={profile} />
                        ))
                    ) : <h4> No profiles found </h4>
                    }
                </div>
            </Container>
        </React.Fragment>
    )
};

Profiles.propTypes = {
    profiles: PropTypes.array,
    getAllProfiles: PropTypes.func
};

Profiles.defaultProps = {
    profiles: []
};

const mapStateToProps = (state) => {
    return{
        loading: state.MainApplicationReducers.AuthReducer.loading,
        profiles: state.MainApplicationReducers.ProfileReducer.profiles,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        getAllProfiles: () => {
            dispatch(getAllProfiles());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profiles);
