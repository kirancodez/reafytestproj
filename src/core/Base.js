import React, {useEffect} from "react";
import Menu from "./Menu";

const Base = ({
  title = "",
  description = "",
  className = "",
  children
}) => {
  useEffect(() => {

  },[Menu])

  return <div>
    <Menu />
    <div className="container-fluid ">
      <div className="jumbotron text-white text-center fontLight mt-5">
        <h2 className="display-5 fontLight">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
  </div>
};

export default Base;
