import * as types from './ActionTypes';
import { takeEvery, all } from 'redux-saga/effects'; 
/* Main Application Saga */
import * as main from './MainApplicationSagas/MainSagas';
import * as profile from './MainApplicationSagas/ProfileSagas';
import * as post from './MainApplicationSagas/PostSagas';
import * as product from './MainApplicationSagas/ProductSagas';
import * as order from './MainApplicationSagas/OrderSagas';

/* Entry point of saga section */
export default function* rootsaga(){
    yield all([
        takeEvery(types.SET_TOASTER, main.setToast),
        takeEvery(types.USER_AUTH, main.loadUser),
        takeEvery(types.REGISTER_USER, main.registerUser),
        takeEvery(types.LOGIN_USER, main.loginUser),
        takeEvery(types.CREATE_PROFILE, profile.createProfile),
        takeEvery(types.GET_PROFILE, profile.getProfile),
        takeEvery(types.GET_ALL_PROFILES, profile.getAllProfiles),
        takeEvery(types.GET_PROFILE_BY_ID, profile.getProfileByID),
        takeEvery(types.ADD_EXPERIENCE, profile.addExperience),
        takeEvery(types.ADD_EDUCATION, profile.addEducation),
        takeEvery(types.DELETE_EXPERIENCE, profile.deleteExperience),
        takeEvery(types.DELETE_EDUCATION, profile.deleteEducation),
        takeEvery(types.DELETE_ACCOUNT, main.deleteAccount),
        takeEvery(types.GET_POSTS, post.getPosts),
        takeEvery(types.ADD_LIKE, post.addLike),
        takeEvery(types.REMOVE_LIKE, post.removeLike),
        takeEvery(types.DELETE_POST, post.deletePost),
        takeEvery(types.ADD_POST, post.addPost),
        takeEvery(types.GET_POST, post.getPost),
        takeEvery(types.ADD_COMMENT, post.addComment),
        takeEvery(types.DELETE_COMMENT, post.deleteComment),
        takeEvery(types.PRODUCT_LIST_REQUEST, product.listProducts),
        takeEvery(types.PRODUCT_DETAILS_REQUEST, product.listProductDetails),
        takeEvery(types.PRODUCT_DELETE_REQUEST, product.deleteProduct),
        takeEvery(types.PRODUCT_CREATE_REQUEST, product.createProduct),
        takeEvery(types.PRODUCT_UPDATE_REQUEST, product.updateProduct),
        takeEvery(types.PRODUCT_CREATE_REVIEW_REQUEST, product.createProductReview),
        takeEvery(types.PRODUCT_TOP_REQUEST, product.listTopProducts),
        takeEvery(types.PRODUCT_UPLOAD_IMAGE_FILE_REQUEST, product.uploadImageFile),
        takeEvery(types.ORDER_CREATE_REQUEST, order.createOrder),
        takeEvery(types.ORDER_LIST_MY_REQUEST, order.listMyOrders),
        takeEvery(types.ORDER_DETAILS_REQUEST, order.getOrderByID),
        takeEvery(types.ORDER_PAY_REQUEST, order.payOrderByID),
        takeEvery(types.ORDER_DELIVER_REQUEST, order.deliverOrderByID),
    ]);
}