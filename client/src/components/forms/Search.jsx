import React from "react";
import { useState } from "react";
import { fetchUsers } from "../../utils/user";
import { UserState } from "../context/UserProvider";
import UsersList from "../user/UsersList";

const Search = ({ isSearching, setIsSearching, setFetchChatsAgain }) => {
  const { user } = UserState();
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const handleUserSearch = async (event) => {
    setIsSearching(true);
    setSearchInput(event.target.value);
    const response = await fetchUsers(event.target.value, user);
    setUsers(response.data);
  };

  return (
    <>
      <div
        className="row p-0 m-0"
        style={{ borderBottom: "0.1rem solid #19bd06" }}
      >
        <div className="input-group p-0 m-0">
          <input
            className="search_input"
            style={{ width: "100%" }}
            type="text"
            value={searchInput}
            onClick={handleUserSearch}
            onChange={handleUserSearch}
            placeholder="Search Users..."
          />
          {isSearching && (
            <i
              className="fa-solid fa-xmark search_cancel"
              onClick={() => {
                setSearchInput("");
                setIsSearching(false);
              }}
            ></i>
          )}
        </div>
      </div>
      {isSearching && (
        <UsersList
          setFetchChatsAgain={setFetchChatsAgain}
          setIsSearching={setIsSearching}
          users={users}
        />
      )}
    </>
  );
};

export default Search;
