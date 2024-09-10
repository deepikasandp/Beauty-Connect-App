import * as types from '../ActionTypes';

export function listProducts(keyword, pageNumber){
  return{
      type: types.PRODUCT_LIST_REQUEST,
      keyword: keyword,
      pageNumber: pageNumber
  }
};

export function listProductDetails(id){
  return{
      type: types.PRODUCT_DETAILS_REQUEST,
      id: id
  }
};

export function deleteProduct(id){
  return{
      type: types.PRODUCT_DELETE_REQUEST,
      id: id
  }
};

export function createProduct(data){
  return{
      type: types.PRODUCT_CREATE_REQUEST,
      data: {
          ...data
      }
  }
};

export function updateProduct(product){
  return{
      type: types.PRODUCT_UPDATE_REQUEST,
      product: product,
  }
};

export function createProductReview(productId, reviewObj){
  return{
      type: types.PRODUCT_CREATE_REVIEW_REQUEST,
      productId: productId,
      reviewObj: reviewObj
  }
};

export function listTopProducts(){
  return{
      type: types.PRODUCT_TOP_REQUEST
  }  
};

export function uploadImageFile(data){
  return{
      type: types.PRODUCT_UPLOAD_IMAGE_FILE_REQUEST,
      data: data,
  }
};