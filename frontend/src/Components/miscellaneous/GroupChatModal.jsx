import React, { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  ModalCloseButton,
  useToast,
  FormControl,
  Input,
  Box,
} from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user, chats, setChats } = ChatState();
  const handleSearch = async (query) => {
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${query}`, config);
      console.log("Data is ", data);
      setSearchResult(data);
      setLoading(false);
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupChatName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );
      console.log("This is data ", data);
      setChats([data, ...chats]);
      onClose();
      toast({
        description: "New Group Created!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } catch (e) {
      toast({
        title: "Error Occured!",
        description: "Failed to Create the Group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleGroup = (userItem) => {
    if (selectedUsers.includes(userItem)) {
      toast({
        title: "User already added!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, userItem]);
  };
  const handleDelete = (userItem) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== userItem._id));
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work Sans"
            display="flex"
            justifyContent={"center"}
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
          >
            <FormControl>
              <Input
                placeholder="Chat Name"
                mb={3}
                onChange={(e) => {
                  setGroupChatName(e.target.value);
                }}
              />
              <Input
                placeholder="Add Users e.g Raza, Abdullah"
                mb={1}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
              <Box width="100%" display="flex" flexWrap={"wrap"}>
                {selectedUsers.map((user) => {
                  return (
                    <>
                      <UserBadgeItem
                        key={user._id}
                        user={user}
                        handleFunction={() => {
                          handleDelete(user);
                        }}
                      />
                    </>
                  );
                })}
              </Box>
              {/* show Searching Users  */}
              {loading ? (
                <>Loading...</>
              ) : (
                <>
                  {searchResult?.slice(0, 4).map((user) => {
                    return (
                      <>
                        <UserListItem
                          key={user._id}
                          user={user}
                          handleFunction={() => {
                            handleGroup(user);
                          }}
                        />
                      </>
                    );
                  })}
                </>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
