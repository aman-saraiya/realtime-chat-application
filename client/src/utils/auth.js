import axios from "axios";

export const createOrUpdateUser = async (authToken) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/create-or-update-user`,
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  ); // we are keeping the body empty as we are sending the token in header
};
