import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";
import PermissionList from 'permission-list';



const UserListRoutes = ({ component: Component, ...rest }) => {
  const Permission = isAutheticated().user ? new PermissionList(isAutheticated().user.assignedPerm ) : new PermissionList(["view"])
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() &&  isAutheticated().user.role == "admin" || isAutheticated().user.role == "reporter" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default UserListRoutes;