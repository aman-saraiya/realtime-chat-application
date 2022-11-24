import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
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
