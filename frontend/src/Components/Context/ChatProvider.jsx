import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
const ChatContext = createContext();
const ChatProvider = ({ children }) => {
  const history = useNavigate();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const item = localStorage.getItem("userInfo");
    const userData = JSON.parse(item);

    if (!userData) {
      history("/");
    }
    setUser(userData);
  }, [history]);
  return (
    <>
      <ChatContext.Provider
        value={{
          user,
          setUser,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
        }}
      >
        {children}
      </ChatContext.Provider>
    </>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};
ChatProvider.propTypes = {
  children: PropTypes.any,
};
export default ChatProvider;
