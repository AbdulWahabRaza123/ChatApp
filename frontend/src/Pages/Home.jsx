import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Login from "../Components/Auth/Login";
import Signup from "../Components/Auth/Signup";
const Home = () => {
  const history = useNavigate();
  const [tabNo, setTabNo] = useState(0);
  const isResponsive = useMediaQuery({
    query: "(max-width: 700px)",
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    if (userData) {
      history("/Chat");
    }
  }, [history]);
  return (
    <Container maxW={"xl"} centerContent>
      <Box
        d="flex"
        justifyContent="center"
        textAlign={"center"}
        p={3}
        bg={"white"}
        w={isResponsive ? "100%" : "100%"}
        height="auto"
        m="40px 0 15px 0"
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text fontSize={"4xl"} fontFamily={"Work sans"} color={"black"}>
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        bg="white"
        w={isResponsive ? "100%" : "100%"}
        black="black"
        p={3}
        borderRadius={"lg"}
        mb="20px"
      >
        <Tabs variant="soft-rounded">
          <TabList mb="1em">
            <Tab
              width="50%"
              _selected={{ background: "#00bfff" }}
              bg={"#89CFF0"}
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
              _selected={{ background: "#00bfff" }}
              bg={"#89CFF0"}
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
              <Login setTabNo={setTabNo} />
            </TabPanel>
            <TabPanel>
              <Signup setTabNo={setTabNo} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
