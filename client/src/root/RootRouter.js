import React, { Fragment, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Landing from '../components/layout/Landing';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Dashboard from '../components/dashboard/Dashboard';
import Logout from '../components/auth/Logout';
import CreateProfile from '../components/profileforms/CreateProfile';
import EditProfile from '../components/profileforms/EditProfile';
import AddExperience from '../components/profileforms/AddExperience';
import AddEducation from '../components/profileforms/AddEducation';
import Profiles from '../components/profiles/Profiles';
import Profile from '../components/profile/Profile';
import Posts from '../components/posts/Posts';
import PublicPosts from '../components/posts/PublicPosts';
import Post from '../components/post/Post';
import CustomerProducts from '../components/products/Products';
import CreateProduct from '../components/profileforms/CreateProduct';
import MoreDetails from '../components/products/MoreDetails';
import EditProduct from '../components/products/EditProduct';
import Cart from '../components/products/Cart';
import Shipping from '../components/products/Shipping';
import Payment from '../components/products/Payment';
import PlaceOrder from '../components/products/PlaceOrder';
import OrderDetails from '../components/products/OrderDetails';
import ViewOrders from '../components/orders/ViewOrders';

import {connect} from 'react-redux';
import { loadUser } from '../actions';
import '../App.css';

const RootRouter = (props) => {
    useEffect(() => {
        props.loadUser();
    }, [props]);
    
    return( 
        <Fragment> 
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <Landing /> } />
                    <Route path='/register' element={ <Register />} />
                    <Route path='/login' element={ <Login />} />
                    <Route path='/dashboard' element={ <Dashboard /> } />
                    <Route path='/profiles' element={ <Profiles /> } />
                    <Route path='/profile/:id' element={ <Profile /> } />
                    <Route path='/createprofile' element={ <CreateProfile />} />
                    <Route path='/edit-profile' element={ <EditProfile />} />
                    <Route path='/add-experience' element={ <AddExperience />} />
                    <Route path='/add-education' element={ <AddEducation />} />
                    <Route path='/public-posts' element={ <PublicPosts />} />
                    <Route path="/posts" element={<Posts />} />
                    <Route path="/posts/:id" element={<Post />} />
                    <Route path="/customer-products" element={<CustomerProducts />} />
                    <Route path='/create-product' element={ <CreateProduct />} />
                    <Route path="/more-product-details/:id" element={<MoreDetails />} />
                    <Route path="/edit-product/:productId" element={<EditProduct />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shipping" element={<Shipping />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/placeOrder" element={<PlaceOrder />} />
                    <Route path="/view-orders" element={<ViewOrders />} />
                    <Route path="/order/:id" element={<OrderDetails />} />
                    <Route path='/logout' element={ <Logout /> } />
                </Routes>  
            </BrowserRouter>  
        </Fragment>
    );
};

RootRouter.propTypes = {
    isAuthenticated: PropTypes.bool,
    loadUser: PropTypes.func
};
RootRouter.defaultProps = {
    isAuthenticated: false
}

const mapStateToProps = (state) => {
    return{
        isAuthenticated: state.MainApplicationReducers.AuthReducer.isAuthenticated,
    };
};

const mapDispatchToProps = (dispatch) =>{
    return{
        loadUser: () => {
            dispatch(loadUser());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);
