import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 

import { connect } from 'react-redux';
import { addEducation } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';

const AddEducation = (props) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        from: '',
        current: false,
        to: '',
        description: ''
    });    

    const [toDateDisable, toggleToDateDisable] = useState(false);

    const {
        school,
        degree,
        from,
        current,
        to,
        description
    } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]:e.target.value });    

    const onFormSubmit = e =>{
        e.preventDefault();
        props.addEducation(formData);
    };

    return (
        <React.Fragment>
            <AlertContainer />
            <Navbar /> 
            <section className="container">
                <h1 className="large text-primary">
                    Add Your Education
                </h1>
                <p className="lead">
                    <i className="fas fa-code-branch"></i> Add any degree/certicate that you have obtained
                </p>
                <small>* = required field</small>                
                <form className="form" onSubmit={(e) => onFormSubmit(e)}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* School" 
                            name="school" 
                            value={school ? school : ''} 
                            onChange={e=> onChange(e)} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            placeholder="* Degree/Certificate" 
                            name="degree"
                            value={degree ? degree : ''} 
                            onChange={e=> onChange(e)}  
                            required 
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
                        /> Current Study</p>
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

AddEducation.propTypes = {
    addEducation: PropTypes.func
};

AddEducation.defaultProps = {
};

const mapDispatchToProps = (dispatch) =>{
    return{
        addEducation: (data) => {
            dispatch(addEducation(data));
        }
    };
};

export default connect(null, mapDispatchToProps)(AddEducation);


