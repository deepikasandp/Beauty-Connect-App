import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostItem from './PostItem';
import { getPosts } from '../../actions';

const Posts = (props) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    props.getPosts();
  }, []);

  useEffect(() => {
    if(props.posts && Object.keys(props.posts).length !== 0){
      setPosts(props.posts);
    }
  }, [props.posts]);

  return (    
    <React.Fragment>
      <Navbar />  
      <section className="container">
        <h1 className="large text-primary">Posts</h1>
        <p className="lead">Welcome to the community
        </p>
        <div className="posts">
          {posts && posts.length > 0 && posts.map((post) => (
            <PostItem key={post._id} post={post} showActions={false}/>
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func,
  posts: PropTypes.array
};

Posts.defaultProps = {
  posts: []
};

const mapStateToProps = (state) => ({
  posts: state.MainApplicationReducers.PostReducer.posts,
  loading: state.MainApplicationReducers.AuthReducer.loading,
});

const mapDispatchToProps = (dispatch) =>{
  return{
    getPosts: () => {
          dispatch(getPosts());
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
