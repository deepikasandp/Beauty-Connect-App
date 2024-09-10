import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileTop = (props) =>{  
  const [profile, setProfile] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    setProfile(props.profile);
    if(props.profile && props.profile.user){
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={user ? user.avatar : ''} alt="" />
      <h1 className="large">{user ? user.name : ''}</h1>
      <p className="lead">
        {profile ? profile.status : ''} {profile && profile.company ? <span> at {profile.company}</span> : ''}
      </p>
      <p>{profile && profile.location ? <span>{profile.location}</span> : ''}</p>
      <div className="icons my-1">
        {profile && profile.website ? (
          <a href={profile ? profile.website : ''} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-spa fa-2x" />
          </a>
        ) : null}
        {profile && profile.social
          ? Object.entries(profile && profile.social)
              .filter(([_, value]) => value)
              .map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`fab fa-${key} fa-2x`}></i>
                </a>
              ))
          : null}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object
};

export default ProfileTop;
