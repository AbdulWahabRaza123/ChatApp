import React, { useState } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { useMediaQuery } from "react-responsive";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
const Home = () => {
  const [tabNo, setTabNo] = useState(0);
  const isResponsive = useMediaQuery({
    query: "(max-width: 700px)",
  });
  return (
    <Container d="flex" width="100%" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign={"center"}
        p={3}
        bg={"white"}
        w={isResponsive ? "80%" : "40%"}
        height="auto"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} color={"black"}>
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w={isResponsive ? "80%" : "40%"}
        black="black"
        p={3}
        borderRadius={"lg"}
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              width="50%"
              bg={"#00bfff"}
              paddingLeft={"10px"}
              paddingRight={"10px"}
              paddingTop="5px"
              paddingBottom="5px"
              borderRadius={"15px"}
              fontSize={"15px"}
              fontWeight={tabNo === 0 ? 600 : 500}
              color={"white"}
              onClick={() => {
                setTabNo(0);
              }}
            >
              Login
            </Tab>
            <Tab
              width="50%"
              bg={"#00bfff"}
              paddingLeft={"10px"}
              paddingRight={"10px"}
              paddingTop="5px"
              paddingBottom="5px"
              borderRadius={"15px"}
              marginLeft="10px"
              fontSize={"15px"}
              fontWeight={tabNo === 1 ? 600 : 500}
              color={"white"}
              onClick={() => {
                setTabNo(1);
              }}
            >
              Sign Up
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
