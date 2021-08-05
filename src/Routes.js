import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";


import UserEditRoutes from "./auth/helper/UserEditRoutes";
import UserListRoutes from "./auth/helper/UserListRoutes";
import UserList from "./user/UserList";
import UserEdit from "./user/UsersEdit";
import Attendence from "./user/Attendence";
import Listing from "./user/Listing";
import Detailpage from "./user/Detailpage";
import Logs from "./user/Logs";


const Routes = () => {
  return (
    <BrowserRouter> 
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/attendance" exact component={Attendence} />
        <UserEditRoutes path="/user/list" exact component={UserList} />
        <UserEditRoutes path="/user/edit" exact component={UserEdit} />
        <UserListRoutes path="/attendance/listing" exact component={Listing} />
        <UserEditRoutes path="/employee-attendance/:userid" exact component={Detailpage} />
        <UserEditRoutes path="/logs" exact component={Logs} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
