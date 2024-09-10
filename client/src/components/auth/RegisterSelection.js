import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Navbar from '../layout/Navbar';

export const RegisterSelection = (props) => {
    return ( 
        <React.Fragment>        
            <Navbar />
            <div className="container d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">
                <Card>
                    <Card.Header><h4>Select User Registration Options</h4></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            If you are a beautician or a stylist please select 'Beautician/Stylist Register' otherwise select 'Customer Register' to view your order details...
                        </Card.Text>
                        <Link to="/register" className="btn btn-primary fs-5">
                            Beautician/Stylist Register
                        </Link>
                        <Link to="/register-customer" className="btn btn-primary fs-5">
                            Customer Register
                        </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <p className="my-1">
                            Already have an account? <Link to="/login">Sign In</Link>
                        </p>
                    </Card.Footer>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default RegisterSelection;
