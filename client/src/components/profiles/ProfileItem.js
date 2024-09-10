import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'; 
import { Button } from 'react-bootstrap';
import BookAppointmentModal from '../bookings/BookAppointmentModal';

export const ProfileItem = (props) => {
    const [profile, setProfile] = useState({});
    const [userID, setUserID] = useState('');
    const [modalShow, setModalShow] = React.useState(false);
    
    useEffect(() => {
        setProfile(props.profile);
        if(props.profile.user){
            setUserID(props.profile.user._id);
        }
    }, [props.profile]);

    return (
        <React.Fragment>
            <div className="profile bg-light">
                <img
                    className="round-img"
                    src={profile && profile.user ? profile.user.avator : ''}
                    alt=""
                />
                <div>
                    <h2>{profile && profile.user ? profile.user.name : ''}</h2>
                    <p>{profile ? profile.status : ''} </p>
                    <p>{profile ? profile.company : ''}</p>
                    <p>{profile ? profile.location : ''}</p>
                    <Link to={`/profile/${userID}`} className="btn btn-primary">View Profile</Link>
                    <Button variant="primary" onClick={() => setModalShow(true)}>Book Appointment
                    </Button>
                </div>                                   
                <BookAppointmentModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    name={profile && profile.user ? profile.user.name : ''}
                    status={profile && profile.status}
                    contact={profile && profile.phone}
                />
                <ul>
                    {profile && profile.skills ? profile.skills.slice(0,4).map((skill, index) => (
                        <li key={index} className="text-primary">
                            <i className="fas fa-check"></i> {skill}
                        </li>
                    )): ''}
                </ul>
            </div>
        </React.Fragment>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object
};

ProfileItem.defaultProps = {
    profile: []
};

export default ProfileItem;
