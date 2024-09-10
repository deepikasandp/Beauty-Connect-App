import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import Navbar from '../layout/Navbar';

export const LoginSelection = (props) => {
    return ( 
        <React.Fragment>        
            <Navbar />
            <div className="container d-flex flex-column min-vh-100 justify-content-center align-items-center text-center">
                <Card>
                    <Card.Header><h4>Select User Login Options</h4></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            If you are a beautician or a stylist please select 'Beautician/Stylist Login' otherwise select 'Customer Login' to view your order details...
                        </Card.Text>
                        <Link to="/login" className="btn btn-primary fs-5">
                            Beautician/Stylist Login
                        </Link>
                        <Link to="/login-customer" className="btn btn-primary fs-5">
                            Customer Login
                        </Link>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                        <p className="my-1">
                            Don't have an account? <Link to="/register">Sign Up</Link>
                        </p>
                    </Card.Footer>
                </Card>
            </div>
        </React.Fragment>
    );
}

export default LoginSelection;
