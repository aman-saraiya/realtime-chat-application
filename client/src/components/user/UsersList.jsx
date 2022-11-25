import React from "react";

const UsersList = ({ users }) => {
  return (
    <div
      className="row p-0 m-0"
      style={{ border: "1px solid green", height: "87%" }}
    >
      {users && users.map((user) => <div key={user._id}>{user.name}</div>)}
    </div>
  );
};

export default UsersList;
