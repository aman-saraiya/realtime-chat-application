import axios from "axios";

const user = JSON.parse(window.localStorage.getItem("user"));

export const fetchUsers = async (searchQuery) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/${user._id}?search=${searchQuery}`,
    {
      headers: { authToken: user.token },
    }
  );
};
