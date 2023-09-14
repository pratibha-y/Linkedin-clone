import React from "react";
import { Space, Spin } from "antd";
import "./index.css";
import LinkedinLoaderLogo from "../../../assets/LinkedinLoaderLogo.png";

export default function Loader() {
  return (
    <div className="loader">
      <div className="loader-logo"><p>Linked</p><img className="linkedin-logo-loader" src={LinkedinLoaderLogo} alt="LinkedinLogo" /></div>
      <Space size="middle">
        <Spin size="large" />
      </Space>
    </div>
  );
}
