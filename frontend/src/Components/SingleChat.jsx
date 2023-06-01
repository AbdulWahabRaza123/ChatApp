import React, { useState, useEffect } from "react";
import { ChatState } from "./Context/ChatProvider";
import {
  Box,
  Text,
  IconButton,
  Spinner,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "./config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import ScrollableChat from "./ScrollableChat";
import axios from "axios";
import "./styles.css";
const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const toast = useToast();
  const typeHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      setLoading(true);
      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );

      setMessages(data);
      setLoading(false);
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the Message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat._id,
          },
          config
        );
        setNewMessage("");
        setMessages([...messages, data]);
      } catch (e) {
        toast({
          title: "Error Occured!",
          description: "Failed to Send the Message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    }
  };
  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            width="100%"
            fontFamily={"Work Sans"}
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems={"center"}
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => {
                setSelectedChat("");
              }}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection={"column"}
            justifyContent={"flex-end"}
            padding={3}
            background={"#E8E8E8"}
            width="100%"
            height="100%"
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <>
                <Spinner
                  size="xl"
                  w={20}
                  h={20}
                  alignSelf={"center"}
                  margin="auto"
                />
              </>
            ) : (
              <>
                <div className="messages">
                  <ScrollableChat messages={messages} />
                </div>
              </>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant={"filled"}
                bg="#E0E0E0"
                placeholder="Enter the message.."
                onChange={typeHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <>
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            height="100%"
          >
            <Text fontSize={"3xl"} pb={3} fontFamily={"Work sans"}>
              Click on user to start Chatting
            </Text>
          </Box>
        </>
      )}
    </>
  );
};

export default SingleChat;
