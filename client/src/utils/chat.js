import axios from "axios";
const user = JSON.parse(window.localStorage.getItem("user"));

export const fetchChats = async () => {
  return await axios.get(`${process.env.REACT_APP_API}/chat/${user._id}`, {
    headers: {
      authToken: user.token,
    },
  });
};

export const createOrFetchPersonalChat = async (toUser) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/chat/`,
    {
      toUser: toUser,
      fromUser: user._id,
    },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};

export const createGroupChat = async (users, groupName, adminUserId) => {
  console.log(users, groupName, adminUserId);
  // return await axios.post(
  //   `${process.env.REACT_APP_API}/group/create`,
  //   {
  //     users: users,
  //     chatName: groupName,
  //     groupAdmin: adminUserId,
  //   },
  //   {
  //     authToken: user.token,
  //   }
  // );
};
