import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../helper/formatDate';
import { deleteComment } from '../../actions';

const CommentItem = (props) => {
  return (
    <React.Fragment>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${props.comment.user}`}>
            <img className="round-img" src={props.comment.avatar} alt="" />
            <h4>{props.comment.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{props.comment.text}</p>
          <p className="post-date">Posted on {formatDate(props.comment.date)}</p>
          {!props.auth.loading && props.comment.user === props.auth.user._id && (
            <button
              onClick={() => props.deleteComment(props.postId, props.comment._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

CommentItem.propTypes = {
  postId: PropTypes.string,
  comment: PropTypes.object,
  auth: PropTypes.object,
  deleteComment: PropTypes.func
};

CommentItem.defaultProps = {
  postId: '',
  comment: {},
  auth: {}
};

const mapStateToProps = (state) => ({
  auth: state.MainApplicationReducers.AuthReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    deleteComment: (postId, commentId) => {
          dispatch(deleteComment(postId, commentId));
      }
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(CommentItem);
