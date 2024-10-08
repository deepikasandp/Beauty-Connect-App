import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_UPLOAD_IMAGE_FILE_REQUEST,
    PRODUCT_UPLOAD_IMAGE_FILE_SUCCESS,
    PRODUCT_UPLOAD_IMAGE_FILE_FAIL
  } from '../../actions/ActionTypes';
  
  export const productListReducer = (state = { products: [] }, action) => {
    const { type, data } = action;
    switch (type) {
      case PRODUCT_LIST_REQUEST:
        return { loading: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
        return {
          loading: false,
          products: data.products,
          pages: data.pages,
          page: data.page,
        }
      case PRODUCT_LIST_FAIL:
        return { loading: false, error: data }
      default:
        return state;
    }
  }
  
  export const productDetailsReducer = (
    state = { product: { reviews: [] } },
    action
  ) => {
    switch (action.type) {
     case PRODUCT_DETAILS_REQUEST:
        return { ...state, loading: true }
      case PRODUCT_DETAILS_SUCCESS:
        return { loading: false, product: action.data }
      case PRODUCT_DETAILS_FAIL:
        return { loading: false, error: action.data }
      default:
        return state
    }
  }
  
  export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_DELETE_REQUEST:
        return { loading: true }
      case PRODUCT_DELETE_SUCCESS:
        return { loading: false, success: true }
      case PRODUCT_DELETE_FAIL:
        return { loading: false, error: action.data }
      default:
        return state
    }
  }
  
  export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REQUEST:
        return { loading: true }
      case PRODUCT_CREATE_SUCCESS:
        return { loading: false, success: true, product: action.data }
      case PRODUCT_CREATE_FAIL:
        return { loading: false, error: action.data }
      case PRODUCT_CREATE_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true }
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true, product: action.data }
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.data }
      case PRODUCT_UPDATE_RESET:
        return { product: {} }
      default:
        return state
    }
  }
  
  export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PRODUCT_CREATE_REVIEW_REQUEST:
        return { loading: true }
      case PRODUCT_CREATE_REVIEW_SUCCESS:
        return { loading: false, success: true }
      case PRODUCT_CREATE_REVIEW_FAIL:
        return { loading: false, error: action.data }
      case PRODUCT_CREATE_REVIEW_RESET:
        return {}
      default:
        return state
    }
  }
  
  export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
      case PRODUCT_TOP_REQUEST:
        return { loading: true, products: [] }
      case PRODUCT_TOP_SUCCESS:
        return { loading: false, products: action.data }
      case PRODUCT_TOP_FAIL:
        return { loading: false, error: action.data }
      default:
        return state
    }
  }
  
  export const productUploadImageFileReducer = (state = { image: '' }, action) => {    
    switch (action.type) {
      case PRODUCT_UPLOAD_IMAGE_FILE_REQUEST:
        return { loading: true, image: '' }
      case PRODUCT_UPLOAD_IMAGE_FILE_SUCCESS:
        return { loading: false, success: true, image: action.data }
      case PRODUCT_UPLOAD_IMAGE_FILE_FAIL:
        return { loading: false, error: action.data }
      default:
        return state
    }
  }
  