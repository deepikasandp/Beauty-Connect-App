import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { createProfile, getProfile } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';

const CreateProfile = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
        props.getProfile();
    }, [props.loading]);

    useEffect(() => {
        if(props.profile && Object.keys(props.profile).length !== 0){
            navigate('/dashboard');
        }
    }, [props.profile]);

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        phone: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        twitter: '',
        facebook: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false);

    const {
        company,
        website,
        phone,
        location,
        status,
        skills,
        bio,
        twitter,
        facebook,
        youtube,
        instagram
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value });    

    const onFormSubmit = e =>{
        e.preventDefault();
        props.createProfile(formData, false);
    }

    return (
        <React.Fragment>
            <AlertContainer />
            <Navbar /> 
            <section className="container">
                <h1 className="large text-primary">
                    Create Your Profile
                </h1>
                <p className="lead">
                    Let's get some information to make your
                    profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <select name="status" value={status} onChange={e=> onChange(e)} required>
                            <option value="">* Select Professional Status</option>
                            <option value="Junior Stylist">Junior Stylist</option>
                            <option value="Senior Stylist">Senior Stylist</option>
                            <option value="Junior Beautician">Junior Beautician</option>
                            <option value="Senior Beautician">Senior Beautician</option>
                        </select>
                        <small className="form-text"
                            >Give us an idea of where you are at in your career</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Company" 
                            name="company" 
                            value={company} 
                            onChange={e=> onChange(e)} 
                        />
                        <small className="form-text"
                            >Could be your own salon or one you work for</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Website" 
                            name="website" 
                            value={website} 
                            onChange={e=> onChange(e)} 
                        />
                        <small className="form-text"
                            >Could be your own or a salon website</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Contact Number" 
                            name="phone" 
                            value={phone} 
                            onChange={e=> onChange(e)}
                            required
                        />
                        <small className="form-text"
                            >This contact number will be used to book appointments</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Location" 
                            name="location" 
                            value={location} 
                            onChange={e=> onChange(e)} 
                        />
                        <small className="form-text"
                            >City & County suggested (eg. Milton Keynes, Buckinghamshire)</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Skills" 
                            name="skills" 
                            value={skills} 
                            onChange={e=> onChange(e)} 
                            required
                        />
                        <small className="form-text"
                            >Please use comma separated values (eg.
                            HTML,CSS,JavaScript,PHP)</small
                        >
                    </div>
                    <div className="form-group">
                        <textarea 
                            placeholder="A short bio of yourself" 
                            name="bio"
                            value={bio} 
                            onChange={e=> onChange(e)} >
                        </textarea>
                        <small className="form-text">Tell us a little about yourself</small>
                    </div>

                    <div className="my-2">
                        <button onClick={()=> toggleDisplaySocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
                            Add Social Network Links
                        </button>
                        <span>Optional</span>
                    </div>
                    { displaySocialInputs && 
                        <React.Fragment>                        
                            <div className="form-group social-input">
                                <i className="fab fa-twitter fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="Twitter URL" 
                                    name="twitter" 
                                    value={twitter} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="Facebook URL" 
                                    name="facebook" 
                                    value={facebook} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="YouTube URL" 
                                    name="youtube" 
                                    value={youtube} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="Instagram URL" 
                                    name="instagram" 
                                    value={instagram} 
                                    onChange={e=> onChange(e)} />
                            </div>
                        </React.Fragment>
                    }
                    <input type="submit" className="btn btn-primary my-1" />
                    <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
                </form>
            </section>
        </React.Fragment>
    )
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func,
    getProfile: PropTypes.func
};

CreateProfile.defaultProps = {
    profile: {}
};

const mapStateToProps = (state) => {
    return{
        loading: state.MainApplicationReducers.AuthReducer.loading,
        profile: state.MainApplicationReducers.ProfileReducer.profile,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        createProfile: (data, edit) => {
            dispatch(createProfile(data, edit));
        },
        getProfile: () => {
            dispatch(getProfile());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);


