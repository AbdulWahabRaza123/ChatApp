import React, { useEffect } from "react";
import {
  useDisclosure,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="40px"
              fontFamily={"Work sans"}
              display="flex"
              justifyContent={"center"}
              textTransform={"capitalize"}
            >
              {user.name}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody
              display="flex"
              flexDir={"column"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
              <Text
                fontSize={{ base: "20px", md: "24px" }}
                fontFamily="Work sans"
              >
                Email: {user.email}
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <div>
        {children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <IconButton
            display={{ base: "flex" }}
            icon={<ViewIcon />}
            onClick={onOpen}
          />
        )}
      </div>
    </>
  );
};

export default ProfileModal;
