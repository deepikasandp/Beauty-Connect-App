import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import formatDate from '../../helper/formatDate';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions';

const PostItem = (props) => {  
  const [post, setPost] = useState({});

  useEffect(() => {
    if(props.post && Object.keys(props.post).length !== 0){
      setPost(props.post);
    }
  }, [props.post]);

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${post.user}`}>
          <img className="round-img" src={post.avator ? post.avator : '' } alt="" />
          <h4>{post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{post.text}</p>
        <p className="post-date">Posted on {post.date ? formatDate(post.date) : ''}</p>

        {props.showActions && (
          <Fragment>
            <button
              onClick={() => props.addLike(post._id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-up" />{' '}
              <span>{post && post.likes && post.likes.length > 0 && <span>{post.likes.length}</span>}</span>
            </button>
            <button
              onClick={() => props.removeLike(post._id)}
              type="button"
              className="btn btn-light"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            {post && post._id &&
              <Link to={`/posts/${post._id}`} className="btn btn-primary">
                Discussion{' '}
                {post && post.comments && post.comments.length > 0 && (
                  <span className="comment-count">{post.comments.length}</span>
                )}
              </Link>
            }
            {!props.auth.loading && post.user === props.auth.user._id && (
              <button
                onClick={() => props.deletePost(post._id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
    </div>
  );
}

PostItem.defaultProps = {
  post: {},
  auth: {},
  showActions: false
};

PostItem.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object,
  addLike: PropTypes.func,
  removeLike: PropTypes.func,
  deletePost: PropTypes.func,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.MainApplicationReducers.AuthReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    addLike: (postId) => {
          dispatch(addLike(postId));
      },
      removeLike: (postId) => {
          dispatch(removeLike(postId));
      },    
      deletePost: (postId) => {
      dispatch(deletePost(postId));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
