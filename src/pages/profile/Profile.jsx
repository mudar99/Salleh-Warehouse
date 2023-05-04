import React from "react";
import List from "../list/List";
import "./profile.scss";
const Profile = () => {
  return (
    <div className="profile">
      <List component="ProfileContent" />
    </div>
  );
};

export default Profile;
