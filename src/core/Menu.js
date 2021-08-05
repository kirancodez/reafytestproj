import React, { Fragment, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAutheticated } from "../auth/helper";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "black" };
  }
};
const Menu = ({ history }) => {
  return <div>
    <ul className="nav nav-tabs bg-light">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home 
        </Link>
      </li>
  
        {/* <li className="nav-item">
        <Link
          style={currentTab(history, "/user/list")}
          className="nav-link"
          to="/user/list"
        >
          View Users
        </Link>
      </li>
       */}
        {
          isAutheticated() && isAutheticated().user.role == "admin" &&
          <li className="nav-item">
          <Link
            style={currentTab(history, "/user/edit")}
            className="nav-link"
            to="/user/edit"
          >
            Edit Users
          </Link>
        </li>
        }
        
        {
          isAutheticated()  &&
          <li className="nav-item">
          <Link
            style={currentTab(history, "/attendance")}
            className="nav-link"
            to="/attendance"
          >
            Attendance
          </Link>
        </li>
        }

        {
          ( isAutheticated()?.user?.role == "admin" || isAutheticated()?.user?.role == "reporter" )  &&
          <li className="nav-item">
          <Link
            style={currentTab(history, "/attendance/listing")}
            className="nav-link"
            to="/attendance/listing"
          >
            Listing
          </Link>
        </li>
        }

        {
          ( isAutheticated()?.user?.role == "admin"  )  &&
          <li className="nav-item">
          <Link
            style={currentTab(history, "/logs")}
            className="nav-link"
            to="/logs"
          >
            Logs
          </Link>
        </li>
        }
            
        
          {/* <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dash")}
            className="nav-link"
            to="/user/dash">
            Dashboard
          </Link>
        </li> */}
        
      
      {!isAutheticated() && (
        <Fragment>
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
