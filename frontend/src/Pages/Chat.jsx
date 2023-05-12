import React, { useState, useEffect } from "react";
import axios from "axios";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [mount, setMount] = useState(false);
  const GetChats = async () => {
    const res = await axios.get("/api/chats");
    setChats(res.data);
  };
  useEffect(() => {
    GetChats();
    setMount(true);
  }, []);
  return (
    mount && (
      <>
        <div>
          <h1>Hello World</h1>
          {chats?.map((val, index) => {
            return (
              <>
                <p key={index}>{val.chatName}</p>
              </>
            );
          })}
        </div>
      </>
    )
  );
};

export default Chat;
