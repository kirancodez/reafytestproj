import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";
import PermissionList from 'permission-list';


const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "black" };
  }
};

const Menu = ({ history }) => {
  
  const Permission = isAutheticated().user ? new PermissionList(isAutheticated().user.assignedPerm ) : new PermissionList(["view"])
  return <div>
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home 
        </Link>
      </li>
      {
       Permission.checkAll(["view", "user-list"])  && 
       (
        <li className="nav-item">
        <Link
          style={currentTab(history, "/user/list")}
          className="nav-link"
          to="/user/list"
        >
          View Users
        </Link>
      </li>
       )
      }
      {
        Permission.checkAll(["view","user-list","user-edit"]) && (
          <li className="nav-item">
            <Link
              style={currentTab(history, "/user/edit")}
              className="nav-link"
              to="/user/edit"
            >
              Edit Users {isAutheticated}
            </Link>
          </li>
        )
      }
      {
        Permission.checkAll(["view","user-list","dashboard"]) && (
          <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dash")}
            className="nav-link"
            to="/user/dash">
            Dashboard
          </Link>
        </li>
        )
      }
      {!isAutheticated() && (
        <Fragment>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signup")}
              className="nav-link"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          <li className="nav-item">
            <Link
              style={currentTab(history, "/signin")}
              className="nav-link"
              to="/signin"
            >
              Sign In
            </Link>
          </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <li className="nav-item">
          <span
            className="nav-link text-warning"
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  </div>
};

export default withRouter(Menu);
