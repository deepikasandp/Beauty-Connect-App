import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import { connect } from 'react-redux';
import { deleteExperience } from '../../actions';

const DisplayExperience = (props) => {
    const[experiences, setExperiences] = useState([]);

    useEffect(() => {
        setExperiences(props.experience);
    }, [props.experience]);

    const handleDelete = (e) => {
        const id = e.target.id;
        id ? props.deleteExperience(id) : '';
    };

    const DisplayUserExperiences = experiences.map(exp => (
        <tr key={exp._id}>
            <td>{exp.company}</td>
            <td className="hide-sm">{exp.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
                {exp.to === null ? (
                    'Now'
                ): (
                    <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                )}
            </td>
            <td>
                <button className="btn btn-danger" id={exp._id} onClick={(e) => handleDelete(e)}>Delete</button>
            </td>
        </tr> 
    ));
    
    return (
        <React.Fragment>     
            <section className="container border">
                <h2 className="mt-2">Experience Credentials</h2>
                <table className="table">
                    <thead>
                        <tr key="headings">
                            <th className="col-2">Company</th>
                            <th className="hide-sm col-2">Title</th>
                            <th className="hide-sm col-2">Years</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {DisplayUserExperiences}
                    </tbody>
                </table>
            </section>
        </React.Fragment>
    )
};

DisplayExperience.propTypes = {
    experience: PropTypes.array
};

DisplayExperience.defaultProps = {
    experience: []
};


const mapDispatchToProps = (dispatch) =>{
    return{
        deleteExperience: (id) => {
            dispatch(deleteExperience(id));
        }
    };
};

export default connect(null, mapDispatchToProps)(DisplayExperience);

