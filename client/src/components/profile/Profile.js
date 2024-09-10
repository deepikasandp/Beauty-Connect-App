import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { getProfileByID } from '../../actions';
import { Button } from 'react-bootstrap';
import BookAppointmentModal from '../bookings/BookAppointmentModal';

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState({});
  const { id } = useParams();
  const [modalShow, setModalShow] = React.useState(false);
  
  useEffect(() => {
    props.getProfileByID(id);
}, [id]);

  useEffect(() => {
    setAuth(props.auth);
  }, [!props.auth.loading]);
  
  useEffect(() => {
    setProfile(props.profile);
    if(props.profile && props.profile.user){
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <section className="container">
      {props.profile === null ? (
        <h4>No profile available</h4>
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>          
          {auth && auth.user && user && auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile && profile.experience && profile.experience.length > 0 ? (
                <Fragment>
                  {profile && profile.experience && profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile && profile.education && profile.education.length > 0 ? (
                <Fragment>
                  {profile && profile.education && profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            <div className="book-appointment bg-primary p-2">
              <Button variant="light" onClick={() => setModalShow(true)}>Book Appointment
              </Button>
            </div>                                             
            <BookAppointmentModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              name={profile && profile.user ? profile.user.name : ''}
              status={profile && profile.status}
              contact={profile && profile.phone}
          />
          </div>
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getProfileByID: PropTypes.func,
  profile: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = (state) => ({
  profile: state.MainApplicationReducers.ProfileReducer.profile,
  auth: state.MainApplicationReducers.AuthReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    getProfileByID: (id) => {
          dispatch(getProfileByID(id));
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
