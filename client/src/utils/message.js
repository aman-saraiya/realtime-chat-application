import axios from "axios";
import { auth } from "../firebase";

export const fetchMessages = async (chatId, limit, offset) => {
  const authToken = await auth.currentUser.getIdToken();
  return await axios.get(
    `${process.env.REACT_APP_API}/message/${chatId}?limit=${limit}&offset=${offset}`,
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};

export const sendMessage = async (chatId, messageContent, userId) => {
  const authToken = await auth.currentUser.getIdToken();
  return axios.post(
    `${process.env.REACT_APP_API}/message`,
    { senderId: userId, chatId: chatId, content: messageContent },
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
