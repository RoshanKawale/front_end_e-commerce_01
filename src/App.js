import React from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom"
import CartPage from './pages/CartPage';
import Checkoutpage from './pages/Checkoutpage';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import {useDispatch , useSelector} from 'react-redux'
import { selectLoggedInUser } from './features/auth/authSlice';
import { useEffect } from 'react';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import PageNotFound from './pages/404';
import OrderSuccesspage from './pages/orderSuccessPage';
import UserOrderPage from './pages/userOrderpage';
import UserProfilePage from './pages/userProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ProtectedAdmin from './features/admin/components/ProtectedAdmin';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminHome from './pages/AdminHome';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';


const options = {
  timeout : 5000,
  position : positions.BOTTOM_LEFT,
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Protected>
      <Home></Home>
    </Protected>
      
  },
  {
    path: '/admin',
    element: <ProtectedAdmin>
      <AdminHome></AdminHome>
    </ProtectedAdmin>
      
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>
  },
  {
    path: '/cart',
    element: <Protected>
      <CartPage></CartPage>
    </Protected>
  },
{
    path: '/checkout',
    element: <Protected>
      <Checkoutpage></Checkoutpage>
    </Protected>
  },
  {
    path: '/product-detail/:id',
    element: <Protected>
      <ProductDetailPage></ProductDetailPage>
    </Protected>
  },
  {
    path: '/admin/product-detail/:id',
    element: <ProtectedAdmin>
      <AdminProductDetailPage></AdminProductDetailPage>
    </ProtectedAdmin>
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path : '/order-success/:id',
    element : <OrderSuccesspage></OrderSuccesspage>
  },
  {
    path : '/orders',
    element : <UserOrderPage></UserOrderPage>
  },
  {
    path : '/profile',
    element : <UserProfilePage></UserProfilePage>
  },
  {
    path : '/logout',
    element : <Logout></Logout>
  },
  {
    path : '/forget-password',
    element : <ForgetPasswordPage></ForgetPasswordPage>
  },
  {
    path : '*',
    element : <PageNotFound></PageNotFound>
  }
])
function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect(()=>{
    if(user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  },[dispatch , user])


  return (
    <div className="App">
      <Provider template={AlertTemplate} {...options}>
      <RouterProvider router={router} />
      </Provider>  
    </div>
  );
}

export default App;
