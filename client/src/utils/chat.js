import axios from "axios";
import { auth } from "../firebase";

// const user = JSON.parse(window.localStorage.getItem("user"));
// const { user } = UserState();

export const fetchChats = async (userId) => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.get(`${process.env.REACT_APP_API}/chat/${userId}`, {
    headers: {
      authToken: authToken,
    },
  });
};

export const createOrFetchPersonalChat = async (toUser, userId) => {
  const authToken = await auth.currentUser.getIdToken();

  return await axios.post(
    `${process.env.REACT_APP_API}/chat/`,
    {
      toUser: toUser,
      fromUser: userId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const createGroupChat = async (
  users,
  groupName,
  adminUserId,
  groupPicture
) => {
  // console.log(users, groupName, adminUserId);
  const authToken = await auth.currentUser.getIdToken();

  return await axios.post(
    `${process.env.REACT_APP_API}/chat/group/create`,
    {
      users: users,
      chatName: groupName,
      groupPicture: groupPicture,
      groupAdmin: adminUserId,
    },
    {
      headers: { authToken: authToken },
    }
  );
};

export const removeUserFromGroup = async (removeUserId, userId, chatId) => {
  const authToken = await auth.currentUser.getIdToken();

  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/remove-user`,
    {
      removeUser: removeUserId,
      loggedInUser: userId,
      groupChatId: chatId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
export const addUserToGroup = async (addUserId, userId, chatId) => {
  const authToken = await auth.currentUser.getIdToken();

  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/add-user`,
    {
      newUser: addUserId,
      loggedInUser: userId,
      groupChatId: chatId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
export const renameGroup = async (newGroupName, groupChatId) => {
  const authToken = await auth.currentUser.getIdToken();

  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/rename-group`,
    {
      newName: newGroupName,
      groupChatId: groupChatId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const updateGroupPicture = async (newGroupPicture, groupChatId) => {
  const authToken = await auth.currentUser.getIdToken();

  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/update-group-picture`,
    {
      profilePictureUri: newGroupPicture,
      groupChatId: groupChatId,
    },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
