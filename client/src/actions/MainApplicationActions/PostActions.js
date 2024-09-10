import * as types from '../ActionTypes';

export function getPosts() {
    return{
        type: types.GET_POSTS
    }
};

export function addLike(postId) {
    return{
        type: types.ADD_LIKE,
        postId: postId
    }
};

export function removeLike(postId) {
    return{
        type: types.REMOVE_LIKE,
        postId: postId
    }
};

export function deletePost(postId) {
    return{
        type: types.DELETE_POST,
        postId: postId
    }
};

export function addPost(data) {
    return{
        type: types.ADD_POST,
        data: {
            ...data
        }
    }
};

export function getPost(postId) {
    return{
        type: types.GET_POST,
        postId: postId
    }
};

export function addComment(postId, data) {
    return{
        type: types.ADD_COMMENT,
        postId: postId,
        data: {
            ...data
        }
    }
};

export function deleteComment(postId, commentId) {
    return{
        type: types.DELETE_COMMENT,
        postId: postId,
        commentId: commentId,
    }
};