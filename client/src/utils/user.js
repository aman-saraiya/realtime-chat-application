import axios from "axios";
import { auth } from "../firebase";

export const fetchUsers = async (searchQuery, userId) => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.get(
    `${process.env.REACT_APP_API}/user/${userId}?search=${searchQuery}`,
    {
      headers: { authToken: authToken },
    }
  );
};

export const updateProfileImage = async (profileImageUri) => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.put(
    `${process.env.REACT_APP_API}/user/updateProfileImage`,
    {
      profilePictureUri: profileImageUri,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const getCurrentUser = async () => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.post(
    `${process.env.REACT_APP_API}/user/current-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
