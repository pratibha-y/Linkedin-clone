import React from "react";
import "./index.css";

export default function Button({ title, onClick }) {
  return (
    <button className="common-btn" onClick={onClick}>
      {title}
    </button>
  );
}
