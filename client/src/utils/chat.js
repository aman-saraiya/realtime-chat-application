import axios from "axios";
import { UserState } from "../components/context/UserProvider";

// const user = JSON.parse(window.localStorage.getItem("user"));
// const { user } = UserState();

export const fetchChats = async (user) => {
  return await axios.get(`${process.env.REACT_APP_API}/chat/${user._id}`, {
    headers: {
      authToken: user.token,
    },
  });
};

export const createOrFetchPersonalChat = async (toUser, user) => {
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

export const createGroupChat = async (
  users,
  groupName,
  adminUserId,
  groupPicture,
  user
) => {
  // console.log(users, groupName, adminUserId);
  return await axios.post(
    `${process.env.REACT_APP_API}/chat/group/create`,
    {
      users: users,
      chatName: groupName,
      groupPicture: groupPicture,
      groupAdmin: adminUserId,
    },
    {
      headers: { authToken: user.token },
    }
  );
};

export const removeUserFromGroup = async (
  removeUserId,
  userId,
  chatId,
  user
) => {
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
export const addUserToGroup = async (addUserId, userId, chatId, user) => {
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
export const renameGroup = async (newGroupName, groupChatId, user) => {
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

export const updateGroupPicture = async (
  newGroupPicture,
  groupChatId,
  user
) => {
  return await axios.put(
    `${process.env.REACT_APP_API}/chat/group/update-group-picture`,
    {
      profilePictureUri: newGroupPicture,
      groupChatId: groupChatId,
    },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};
