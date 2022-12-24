import React from "react";

const UserCardModal = ({
  isAdmin,
  user,
  removeUserFromGroup,
  isCurrentUserAdmin,
}) => {
  return (
    <div
      className="row d-flex m-0 p-0"
      style={{ borderBottom: "0.05rem solid #ffffff" }}
    >
      <div className="col-1 p-0 m-0 d-flex align-items-center justify-content-center">
        <img
          src={user.profilePicture.url}
          style={{ width: "0.8rem", height: "0.8rem", borderRadius: "0.4rem" }}
        />
      </div>
      <div
        className="col p-1 m-0 align-items-center"
        style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
      >
        {user.name} {isAdmin && "(Admin)"}
      </div>
      {!isAdmin && isCurrentUserAdmin && (
        <div
          className="col-1 p-1 m-0  align-items-center"
          style={{ fontSize: "0.8rem", lineHeight: "1rem" }}
        >
          <i
            className="fa-solid fa-xmark search_cancel"
            style={{ backgroundColor: "#19bd06", color: "#ffffff" }}
            onClick={removeUserFromGroup}
          ></i>
        </div>
      )}
    </div>
  );
};

export default UserCardModal;
