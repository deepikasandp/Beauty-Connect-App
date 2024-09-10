import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { useNavigate, Link } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { addExperience } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';

const AddExperience = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        current: false,
        to: '',
        description: ''
    });    

    const [toDateDisable, toggleToDateDisable] = useState(false);

    const {
        title,
        company,
        location,
        from,
        current,
        to,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value });    

    const onFormSubmit = e =>{
        e.preventDefault();
        props.addExperience(formData);
    }

    return (
        <React.Fragment>
            <AlertContainer />
            <Navbar /> 
            <section className="container">
                <h1 className="large text-primary">
                    Add An Experience
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any beautician/stylist
                    positions that you have had in the past
                </p>
                <small>* = required field</small>                
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Job Title" 
                            name="title" 
                            value={title ? title : ''} 
                            onChange={e=> onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Organisation" 
                            name="company"
                            value={company ? company : ''} 
                            onChange={e=> onChange(e)}  
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="Location" 
                            name="location" 
                            value={location ? location : ''} 
                            onChange={e=> onChange(e)} 
                        />
                    </div>
                    <div className="form-group">
                        <h4>From Date</h4>
                        <input 
                            type="date" 
                            name="from" 
                            value={from ? from : ''} 
                            onChange={e=> onChange(e)} 
                        />
                    </div>
                    <div className="form-group">
                        <p><input 
                            type="checkbox" 
                            name="current" 
                            value={current ? current : ''}
                            onChange={e=> {
                                setFormData({...formData, current: !current});
                                toggleToDateDisable(!toDateDisable);
                            }}
                        /> Current Job</p>
                    </div>
                    <div className="form-group">
                        <h4>To Date</h4>
                        <input 
                            type="date" 
                            name="to"                            
                            value={to ? to : ''} 
                            onChange={e=> onChange(e)}
                            disabled={toDateDisable ? 'disabled' : ''}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="description"
                            cols="30"
                            rows="5"
                            placeholder="Job Description"
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

AddExperience.propTypes = {
    addExperience: PropTypes.func
};

AddExperience.defaultProps = {
};

const mapDispatchToProps = (dispatch) =>{
    return{
        addExperience: (data) => {
            dispatch(addExperience(data));
        }
    };
};

export default connect(null, mapDispatchToProps)(AddExperience);


