import React from "react";
import "../CSS/HomeComponent.css";
import PostStatus from "./common/PostUpdate";

export default function HomeComponent({ currentUser }) {
  return (
    <div className="home-component">
      <PostStatus currentUser={currentUser} />
    </div>
  );
}
