import React, { useState } from "react";
import ProfileCard from "./common/ProfileCard";
import ProfileEdit from "./common/ProfileEdit";
import "../CSS/HomeComponent.css";

export default function ProfileComponent({ currentUser }) {
  const [isEdit, setisEdit] = useState(false);

  const onEdit = () => {
    setisEdit(!isEdit);
  };
  return (
    <div className="profile-main">
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}
