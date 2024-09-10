import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PostItem from '../posts/PostItem';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost } from '../../actions';

const Post = (props) => {
  const [post, setPost] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if(id)
      props.getPost(id);
  }, []);
  
  useEffect(() => {
    if(props.post && Object.keys(props.post).length !== 0){
      setPost(props.post);
    }
  }, [props.post]);
  
  return(    
    <React.Fragment>
      <Navbar />
      <section className="container">
        <Link to="/posts" className="btn">
          Back To Posts
        </Link>
        {post && Object.keys(post).length !== 0 &&
          <React.Fragment>
            <PostItem post={post} showActions={false} />
            <CommentForm postId={post._id} />
            <div className="comments">
              {post && post.comments && post.comments.map((comment) => (
                <CommentItem key={comment._id} comment={comment} postId={post._id} />
              ))}
            </div>
          </React.Fragment>
          }
      </section>
    </React.Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func,
  post: PropTypes.object
};

Post.defaultProps = {
  post: {}
};

const mapStateToProps = (state) => ({
  post: state.MainApplicationReducers.PostReducer.post,
});

const mapDispatchToProps = (dispatch) =>{
  return{
    getPost: (id) => {
          dispatch(getPost(id));
      }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Post);
