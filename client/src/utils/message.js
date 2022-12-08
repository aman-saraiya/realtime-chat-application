import axios from "axios";
const user = JSON.parse(window.localStorage.getItem("user"));

export const fetchMessages = async (chatId, limit, offset) => {
  return await axios.get(
    `${process.env.REACT_APP_API}/message/${chatId}?limit=${limit}&offset=${offset}`,
    {
      headers: {
        authToken: user.token,
      },
    }
  );
};

export const sendMessage = async (chatId, messageContent) => {
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
