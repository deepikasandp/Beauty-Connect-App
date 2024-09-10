import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = (props) => {  
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setProfile(props.profile);
    if(props.profile && props.profile.user){
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <div className='profile-about bg-light p-2'>
      {profile && profile.bio && (
        <Fragment>
          <h2 className='text-primary'>{user && user.name.trim().split(' ')[0]}s Bio</h2>
          <p>{profile ? profile.bio : ''}</p>
          <div className='line' />
        </Fragment>
      )}
      <h2 className='text-primary'>Skill Set</h2>
      <div className='skills'>
        {profile && profile.skills && profile.skills.length > 0 && profile.skills.map((skill, index) => (
          <div key={index} className='p-1'>
            <i className='fas fa-check' /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object
};

export default ProfileAbout;
