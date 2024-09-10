import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = (props) => {
    return (
        <React.Fragment>
            <Link to="/edit-profile" className="btn btn-primary"><i className="fas fa-user-circle"></i> Edit Profile</Link>
            <Link to="/add-experience" className="btn btn-primary"><i className="fab fa-black-tie"></i> Add Experience</Link>
            <Link to="/add-education" className="btn btn-primary"><i className="fas fa-graduation-cap"></i> Add Education</Link>
            <Link to="/create-product" className="btn btn-primary m-1"><i className="fas fa-store"></i> Create Products</Link>
            <Link to="/view-orders" className="btn btn-primary m-1"><i className="fas fa-store"></i> View Orders</Link>
        </React.Fragment>
    )
};

export default DashboardActions;

