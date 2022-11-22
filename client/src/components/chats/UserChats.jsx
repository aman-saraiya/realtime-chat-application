import React from "react";
import Search from "../forms/Search";
import { Button } from "antd";
const UserChats = () => {
  return (
    <div className="d-inline">
      UserChats
      <Search />
      <Button>+ New Group Chat</Button>
    </div>
  );
};

export default UserChats;
