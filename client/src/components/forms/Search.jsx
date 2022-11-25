import React from "react";
import { useState } from "react";
import { fetchUsers } from "../../utils/user";
import UsersList from "../user/UsersList";

const Search = ({ isSearching, setIsSearching }) => {
  const [users, setUsers] = useState([]);

  const handleUserSearch = async (event) => {
    setIsSearching(true);

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
            onClick={handleUserSearch}
            onChange={handleUserSearch}
          />
          <i
            class="fa-solid fa-xmark"
            style={{ background: "white" }}
            onClick={() => setIsSearching(false)}
          ></i>
        </div>
      </div>
      {isSearching && <UsersList users={users} />}
    </>
  );
};

export default Search;
