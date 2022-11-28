import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Image, Dropdown, Button, Modal } from "antd";
import { UsergroupAddOutlined } from "@ant-design/icons";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { ChatsState } from "../context/ChatsProvider";
import CreateGroup from "../modal/CreateGroup";
const ChatsHeader = ({ setFetchChatsAgain, socket }) => {
  const navigate = useNavigate();
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const logout = async () => {
    await signOut(auth);
    window.localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(window.localStorage.getItem("user"));
  const items = [
    { label: "View Profile", key: "view-profile" }, // remember to pass the key prop
    { label: <div onClick={logout}>Sign Out</div>, key: "sign-out" },
  ];
  return (
    <div className="row p-0 m-0" style={{ height: "8%" }}>
      <div className="col-1 p-0 m-0" style={{ border: "3px solid green" }}>
        <Avatar
          src={user.profilePicture}
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 40 }}
        />
      </div>
      <div className="col">{user.name}</div>
      <div
        className="col-1 p-0 m-0 float-end"
        style={{ border: "1px solid red" }}
      >
        <Button shape="circle" onClick={() => setIsCreateGroupModalOpen(true)}>
          <UsergroupAddOutlined />
        </Button>
        <CreateGroup
          isCreateGroupModalOpen={isCreateGroupModalOpen}
          setIsCreateGroupModalOpen={setIsCreateGroupModalOpen}
          setFetchChatsAgain={setFetchChatsAgain}
          socket={socket}
        />
      </div>
      <div
        className="col-1 p-0 m-0 float-end"
        style={{ border: "1px solid red" }}
      >
        <Dropdown placement="bottomRight" menu={{ items }}>
          <a>
            <Button shape="circle">
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </Button>
          </a>
        </Dropdown>
      </div>
    </div>
  );
};

export default ChatsHeader;
