import React from "react";

const UserChicklet = ({ name, onRemove, isAdmin }) => {
  return (
    <div style={{ border: "1px solid red", margin: "5px" }}>
      {name}
      {isAdmin && (
        <i
          className="fa-solid fa-xmark"
          style={{ background: "white", paddingLeft: "5px" }}
          onClick={onRemove}
        ></i>
      )}
    </div>
  );
};

export default UserChicklet;
