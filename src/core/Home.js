import React from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";

export default function Home() {
  return (
    <Base >
      <div className="row quote">
        <h1 className=" text-white center">We are awesome, We did Awesome</h1>
      </div>
    </Base>
  );
}
