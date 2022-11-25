import React from "react";
import { useState } from "react";
import { fetchUsers } from "../../utils/user";
import UsersList from "../user/UsersList";

const Search = ({ isSearching, setIsSearching }) => {
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleUserSearch = async (event) => {
    setIsSearching(true);
    setSearchInput(event.target.value);
    const response = await fetchUsers(event.target.value);
    setUsers(response.data);
  };

  return (
    <>
      <div className="row p-0 m-0" style={{ height: "5%" }}>
        <div className="input-group p-0 m-0">
          <input
            style={{ width: "100%", border: "none" }}
            type="text"
            value={searchInput}
            onClick={handleUserSearch}
            onChange={handleUserSearch}
          />
          <i
            className="fa-solid fa-xmark"
            style={{ background: "white" }}
            onClick={() => {
              setSearchInput("");
              setIsSearching(false);
            }}
          ></i>
        </div>
      </div>
      {isSearching && <UsersList users={users} />}
    </>
  );
};

export default Search;
