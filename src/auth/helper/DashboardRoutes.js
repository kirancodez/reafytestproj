import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAutheticated } from "./index";
import PermissionList from 'permission-list';


const DashboardRoutes = ({ component: Component, ...rest }) => {
  const Permission = isAutheticated().user ? new PermissionList(isAutheticated().user.assignedPerm ) : new PermissionList(["view"])
  return (
    <Route
      {...rest}
      render={props =>
        isAutheticated() && Permission.checkAll(["view","dashboard"]) ? (
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

export default DashboardRoutes;
