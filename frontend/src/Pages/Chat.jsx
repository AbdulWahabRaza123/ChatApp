import { useState } from "react";
import { ChatState } from "../Components/Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import ChatBox from "../Components/ChatBox";
import MyChats from "../Components/MyChats";
import SideDrawer from "../Components/miscellaneous/SideDrawer";
// import axios from "axios";
import PropTypes from "prop-types";
const Chat = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <>
      <div style={{ width: "100%" }}>
        {user && <SideDrawer />}
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width="100%"
          height="92%"
          p="10px"
        >
          {user && <MyChats fetchAgain={fetchAgain} />}
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </Box>
      </div>
    </>
  );
};
Chat.propTypes = {
  props: PropTypes.any,
};
export default Chat;
