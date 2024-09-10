import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { createProfile, getProfile } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';

const EditProfile = (props) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});

    useEffect(() => {
        props.getProfile();
    }, [props.loading]);    

    useEffect(() => {
        if(props.profile && Object.keys(props.profile).length !== 0){
            const data = props.profile;
            if(data.skills){
                data.skills = data.skills.toString();
            };
            setFormData(data);
        }
    }, [props.profile]);
    
    const [displaySocialInputs, toggleDisplaySocialInputs] = useState(false);

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value });    

    const onFormSubmit = e =>{
        e.preventDefault();
        props.createProfile(formData, true);
    }

    return (
        <React.Fragment>
            <AlertContainer />
            <Navbar /> 
            <section className="container">
                <h1 className="large text-primary">
                    Edit Your Profile
                </h1>
                <p className="lead">
                    <i className="fas fa-user"></i> Let's get some information to make your
                    profile stand out
                </p>
                <small>* = required field</small>
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <select name="status" value={formData.status ? formData.status : ''} onChange={e=> onChange(e)}>
                            <option value="0">* Select Professional Status</option>
                            <option value="Junior Stylist">Junior Stylist</option>
                            <option value="Senior Stylist">Senior Stylist</option>
                            <option value="Junior Beautician">Junior Stylist</option>
                            <option value="Senior Beautician">Senior Stylist</option>
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
                            value={formData.company ? formData.company : ''} 
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
                            value={formData.website ? formData.website : ''} 
                            onChange={e=> onChange(e)} 
                        />
                        <small className="form-text"
                            >Could be your own or a salon website</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Contact Number" 
                            name="phone" 
                            value={formData.phone ? formData.phone : ''} 
                            onChange={e=> onChange(e)} 
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
                            value={formData.location ? formData.location : ''} 
                            onChange={e=> onChange(e)} 
                        />
                        <small className="form-text"
                            >City & state suggested (eg. Boston, MA)</small
                        >
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Skills" 
                            name="skills" 
                            value={formData.skills ? formData.skills : ''} 
                            onChange={e=> onChange(e)} 
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
                            value={formData.bio ? formData.bio : ''} 
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
                                    value={formData.twitter ? formData.twitter : ''} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-facebook fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="Facebook URL" 
                                    name="facebook" 
                                    value={formData.facebook ? formData.facebook : ''} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-youtube fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="YouTube URL" 
                                    name="youtube" 
                                    value={formData.youtube ? formData.youtube : ''} 
                                    onChange={e=> onChange(e)} />
                            </div>

                            <div className="form-group social-input">
                                <i className="fab fa-instagram fa-2x"></i>
                                <input 
                                    type="text" 
                                    placeholder="Instagram URL" 
                                    name="instagram" 
                                    value={formData.instagram ? formData.instagram : ''} 
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

EditProfile.propTypes = {
    createProfile: PropTypes.func,
    getProfile: PropTypes.func,
    profile: PropTypes.object,
};

EditProfile.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);


