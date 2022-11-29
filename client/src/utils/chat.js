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
  // console.log(users, groupName, adminUserId);
  return await axios.post(
    `${process.env.REACT_APP_API}/chat/group/create`,
    {
      users: users,
      chatName: groupName,
      groupAdmin: adminUserId,
    },
    {
      headers: { authToken: user.token },
    }
  );
};

export const removeUserFromGroup = async (removeUserId, userId, chatId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/remove-user`,
    {
      removeUser: removeUserId,
      loggedInUser: userId,
      groupChatId: chatId,
    },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};
export const addUserToGroup = async (addUserId, userId, chatId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/add-user`,
    {
      newUser: addUserId,
      loggedInUser: userId,
      groupChatId: chatId,
    },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};
export const renameGroup = async (newGroupName, groupChatId) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/rename-group`,
    {
      newName: newGroupName,
      groupChatId: groupChatId,
    },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};
