import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";


import UserEditRoutes from "./auth/helper/UserEditRoutes";
import UserListRoutes from "./auth/helper/UserListRoutes";
import UserList from "./user/UserList";
import UserEdit from "./user/UsersEdit";
import Dashboard from "./user/Dashboard";
import DashboardRoutes from "./auth/helper/DashboardRoutes";
import AdminListing from "./user/AdminList";


const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <UserListRoutes path="/user/list" exact component={UserList} />
        <UserEditRoutes path="/user/edit" exact component={UserEdit} />
        <UserEditRoutes path="/user/dash" exact component={Dashboard} />
        <DashboardRoutes path="/admin/list" exact component={AdminListing} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
