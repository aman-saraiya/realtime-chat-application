import axios from "axios";
import { UserState } from "../components/context/UserProvider";

//const user = JSON.parse(window.localStorage.getItem("user"));
// const { user } = UserState();

export const fetchMessages = async (chatId, limit, offset, user) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/message/${chatId}?limit=${limit}&offset=${offset}`,
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};

export const sendMessage = async (chatId, messageContent, user) => {
  return axios.post(
    `${process.env.REACT_APP_API}/message`,
    { senderId: user._id, chatId: chatId, content: messageContent },
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};
