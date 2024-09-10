import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteEducation } from '../../actions';

const DisplayEducation = (props) => {
    const[educations, setEducations] = useState([]);

    useEffect(() => {
        setEducations(props.education);
    }, [props.education]);
    
    const handleDelete = (e) => {
        const id = e.target.id;
        id ? props.deleteEducation(id): '';
    };

    const DisplayUserEducations = educations.map(edu => (
        <tr key={edu._id}>
            <td>{edu.school}</td>
            <td className="hide-sm">{edu.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
                {edu.to === null ? (
                    'Now'
                ): (
                    <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                )}
            </td>
            <td>
                <button className="btn btn-danger" id={edu._id} onClick={(e) => handleDelete(e)}>Delete</button>
            </td>
        </tr> 
    ));
    
    return (
        <React.Fragment>     
            <section className="container border">
                <h2 className="mt-2">Education Credentials</h2>
                <table className="table">
                    <thead>
                        <tr key="headings">
                            <th className="col-2">School</th>
                            <th className="hide-sm col-2">Degree/Certificate</th>
                            <th className="hide-sm col-2">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayUserEducations}
                    </tbody>
                </table>
            </section>
        </React.Fragment>
    )
};

DisplayEducation.propTypes = {
    education: PropTypes.array
};

DisplayEducation.defaultProps = {
    education: []
};

const mapDispatchToProps = (dispatch) =>{
    return{
        deleteEducation: (id) => {
            dispatch(deleteEducation(id));
        }
    };
};

export default connect(null, mapDispatchToProps)(DisplayEducation);