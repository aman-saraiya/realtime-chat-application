import axios from "axios";
import { auth } from "../firebase";

export const createOrUpdateUser = async () => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.post(
    `${process.env.REACT_APP_API}/user/create-or-update`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  ); // we are keeping the body empty as we are sending the token in header
};
