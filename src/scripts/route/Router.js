import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import Cookies from 'js-cookie';

import Home from '../views/pages/Home';
import NavigationBar from '../views/components/NavigationBar';
import Footer from '../views/components/Footer';
import Login from '../views/pages/Login';
import AdminDashboard from '../views/pages/AdminDashboard';

import Authenticated from '../middleware/Authenticated';
import AdminRoute from '../middleware/AdminRoute';
import UserRoute from '../middleware/UserRoute';
import Register from '../views/pages/Register';
import BottomNavBar from '../views/components/BottomNavBar';
import DetailPage from '../views/pages/DetailPage';
import UserBooking from '../views/pages/UserBooking';
import CheckOutPage from '../views/pages/CheckOutPage';
import OrderPage from '../views/pages/OrderPage';
import UserProfilePage from '../views/pages/UserProfilePage';
import SideNavbar from '../views/components/SIdeNavBar';
import AdminContent from '../views/components/AdminContent';
import AdminRooms from '../views/pages/AdminRooms';
import AdminRoomDetail from '../views/pages/AdminRoomDetail';
import AdminListUser from '../views/pages/AdminListUser';
import CompleteProfilePage from '../views/pages/CompleteProfilePage';
import OrderDetailPage from '../views/pages/OrderDetailPage';

function Router() {
  return (
    <Switch>
      <Route exact path="/">
        <Authenticated>
          <NavigationBar solid="false" scrollChange="true" />
          <Home />
          <Footer />
          <BottomNavBar />
        </Authenticated>
      </Route>
      <Route path="/room/:id">
        <NavigationBar solid="true" scrollChange="false" />
        <DetailPage />
        <Footer />
        <BottomNavBar />
      </Route>

      {/* User Route */}
      <Route exact path="/user">
        <UserRoute>
          <NavigationBar solid="false" scrollChange="true" />
          <Home />
          <Footer />
        </UserRoute>
        <BottomNavBar />
      </Route>
      <Route exact path="/profile">
        <UserRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <UserProfilePage />
          <Footer />
          <BottomNavBar />
        </UserRoute>
      </Route>
      <Route exact path="/booking">
        <UserRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <UserBooking />
          <Footer />
          <BottomNavBar />
        </UserRoute>
      </Route>
      <Route exact path="/order">
        <UserRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <OrderPage />
          <Footer />
          <BottomNavBar />
        </UserRoute>
      </Route>
      <Route exact path="/order/detail/:id">
        <UserRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <OrderDetailPage />
          <Footer />
          <BottomNavBar />
        </UserRoute>
      </Route>
      <Route path="/checkout">
        <UserRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <CheckOutPage />
          <Footer />
        </UserRoute>
      </Route>

      {/* Admin Route */}
      <Route exact path="/admin/dashboard">
        <AdminRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <SideNavbar />
          <AdminContent>
            <AdminDashboard />
            <Footer />
          </AdminContent>
        </AdminRoute>
      </Route>
      <Route exact path="/admin/rooms/">
        <AdminRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <SideNavbar />
          <AdminContent>
            <AdminRooms />
            <Footer />
          </AdminContent>
        </AdminRoute>
      </Route>
      <Route path="/admin/rooms/:id">
        <AdminRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <SideNavbar />
          <AdminContent>
            <AdminRoomDetail />
            <Footer />
          </AdminContent>
        </AdminRoute>
      </Route>
      <Route exact path="/admin/users">
        <AdminRoute>
          <NavigationBar solid="true" scrollChange="false" />
          <SideNavbar />
          <AdminContent>
            <AdminListUser />
            <Footer />
          </AdminContent>
        </AdminRoute>
      </Route>

      {/* Autentication Route */}
      <Route exact path="/login">
        <Authenticated>
          <NavigationBar solid="true" scrollChange="false" />
          <Login />
          <BottomNavBar />
        </Authenticated>
      </Route>
      <Route exact path="/register">
        <NavigationBar solid="true" scrollChange="false" />
        <Register />
        <BottomNavBar />
      </Route>
      <Route exact path="/complete-your-profile">
        <UserRoute>
          <CompleteProfilePage />
        </UserRoute>
      </Route>

      <Route exact path="*">
        <Redirect from="*" to="/" />
      </Route>
    </Switch>
  );
}

export default Router;
