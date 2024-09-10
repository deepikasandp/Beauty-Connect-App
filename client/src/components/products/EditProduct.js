import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Message from './Message';
import Loader from './Loader';
import FormContainer from './FormContainer';
import { listProductDetails, updateProduct, uploadImageFile } from '../../actions';
import { AlertContainer } from '../utility/AlertContainer';
import axios from 'axios';

const EditProduct = (props) => {
  const { productId } = useParams();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if(productId)
      props.listProductDetails(productId);
  }, [productId]);
  
  useEffect(() => {
    if(props.productDetails && !props.productDetails.loading){
      if(props.productDetails.product){
        setFormData(props.productDetails.product);
      }
    }
  }, [props.productDetails]);
  
  useEffect(() => {
    if(!props.isAuthenticated){
        navigate('/login');
    };
  }, [props.isAuthenticated, navigate]);

  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value }); 

  const goBackHandler = () => {
    setFormData({});    
    navigate('/dashboard');
  }

  const uploadFileHandler = e => {
    const file = e.target.files[0];
    // props.uploadImageFile(file);
    const myFormData = new FormData();
    myFormData.append('image', file);
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const response = axios.post("http://localhost:5000/api/products/upload",myFormData,config).then(res => {
        const result = res.data;
        setFormData({...formData, image:result });
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.updateProduct(formData);
  };

  return (
    <React.Fragment>
      <AlertContainer />
      <Navbar /> 
      <section className="container">
        <h1 className="large text-primary">Edit Product</h1>        
        <Form onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              name="name" 
              value={formData.name ? formData.name : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Price</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter price'
              name="price" 
              value={formData.price ? formData.price : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter image url'
              name="image" 
              value={formData.image ? formData.image : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
            <Form.Control
              type='file'
              id='image-file'
              label='Choose File'
              custom='true'
              onChange={uploadFileHandler}
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter brand'
              name="brand" 
              value={formData.brand ? formData.brand : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type='number'
              placeholder='Enter countInStock'
              name="countInStock" 
              value={formData.countInStock ? formData.countInStock : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter category'
              name="category" 
              value={formData.category ? formData.category : ''} 
              onChange={e=> onChange(e)} 
            ></Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter description'
              name="description" 
              value={formData.description ? formData.description : ''} 
              onChange={e=> onChange(e)}
            ></Form.Control>
          </Form.Group>

          <input type="submit" value="Save" className="btn btn-primary my-1" />          
          <button className="btn btn-danger" onClick={()=>goBackHandler()}>Go Back</button>
        </Form>
      </section>
    </React.Fragment>
  )
}

EditProduct.propTypes = {
  isAuthenticated: PropTypes.bool,
  productDetails: PropTypes.object,
  productUpdate: PropTypes.object, 
  updateProduct: PropTypes.func
};

EditProduct.defaultProps = {
  productDetails: {},
  productUpdate: {},
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,  
  productDetails: state.MainApplicationReducers.productDetailsReducer,
  productUpdate: state.MainApplicationReducers.productUpdateReducer
});

const mapDispatchToProps = (dispatch) =>{
  return{
    listProductDetails: (id) => {
      dispatch(listProductDetails(id));
    },
    updateProduct: (data) => {
      dispatch(updateProduct(data));
    },
    uploadImageFile: (data) => {
      dispatch(uploadImageFile(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
