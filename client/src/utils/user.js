import axios from "axios";
import { UserState } from "../components/context/UserProvider";
// const user = JSON.parse(window.localStorage.getItem("user"));
// const { user } = UserState();

export const fetchUsers = async (searchQuery, user) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/user/${user._id}?search=${searchQuery}`,
    {
      headers: { authToken: user.token },
    }
  );
};
