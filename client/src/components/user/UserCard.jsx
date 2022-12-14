import React from "react";

const UserCard = ({ user }) => {
  return (
    <>
      <div className="col-1 p-0 m-0 d-flex align-items-center">
        <img src={user.profilePicture} className="profile_image" />
      </div>
      <div
        className="col p-1 d-flex align-items-center"
        style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
      >
        {user.name}
      </div>
    </>
  );
};

export default UserCard;
