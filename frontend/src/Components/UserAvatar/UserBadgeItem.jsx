import React from "react";
import { Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <>
      <Box
        paddingX={2}
        paddingY={1}
        borderRadius="lg"
        m={1}
        mb={2}
        variant="solid"
        fontSize={12}
        background={"purple"}
        color="white"
        cursor="pointer"
      >
        {user.name}

        <CloseIcon paddingLeft={1} onClick={handleFunction} />
      </Box>
    </>
  );
};

export default UserBadgeItem;
