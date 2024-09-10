import{
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILED,
    ADD_LIKE_SUCCESS,
    ADD_LIKE_FAILED,
    REMOVE_LIKE_SUCCESS,
    REMOVE_LIKE_FAILED,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAILED,
    ADD_POST_SUCCESS,
    ADD_POST_FAILED,
    GET_POST_SUCCESS,
    GET_POST_FAILED,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILED,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILED
} from '../../actions/ActionTypes';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export const PostReducer = (state = initialState, action) => {
    const { type, data } = action;
  
    switch (type) {
      case GET_POSTS_SUCCESS:
        return {
          ...state,
          posts: data,
          loading: false
        };
      case GET_POST_SUCCESS:
        return {
          ...state,
          post: data,
          loading: false
        };
      case ADD_POST_SUCCESS:
        return {
          ...state,
          posts: [data, ...state.posts],
          loading: false
        };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          posts: state.posts.filter((post) => post._id !== data),
          loading: false
        };
      case GET_POSTS_FAILED:
      case ADD_LIKE_FAILED:
      case REMOVE_LIKE_FAILED:
      case DELETE_POST_FAILED:
      case ADD_POST_FAILED:
      case GET_POST_FAILED:
      case ADD_COMMENT_FAILED:
      case DELETE_COMMENT_FAILED:
        return {
          ...state,
          error: data,
          loading: false
        };
      case ADD_LIKE_SUCCESS:
      case REMOVE_LIKE_SUCCESS:
        return {
          ...state,
          posts: state.posts.map((post) =>
            post._id === data.id ? { ...post, likes: data.likes } : post
          ),
          loading: false
        };
      case ADD_COMMENT_SUCCESS:
        return {
          ...state,
          post: { ...state.post, comments: data },
          loading: false
        };
      case DELETE_COMMENT_SUCCESS:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              (comment) => comment._id !== data
            )
          },
          loading: false
        };
      default:
        return state;
    }
};
  
