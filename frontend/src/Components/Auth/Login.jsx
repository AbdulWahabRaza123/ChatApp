import { useState } from "react";
import {
  Container,
  InputGroup,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
  useToast,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const history = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitDetails = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (email && password) {
        const res = await fetch("/api/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        });
        console.log("This is response ", res.status);
        if (res.status === 201) {
          const data = await res.json();
          localStorage.setItem("userInfo", data);
          setLoading(false);
          history("/chat");
        } else {
          setLoading(false);
          toast({
            title: "Error",
            description: "Wronge Credientials!",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } else {
        setLoading(false);
        toast({
          title: "Error",
          description: "Password not matching!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const LoginGuest = () => {
    history("/chat");
  };
  return (
    <>
      <Container>
        <VStack marginTop="2rem" spacing={4} align="stretch" color={"black"}>
          <FormControl id="email" isRequired>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              width="100%"
              p="5px"
              borderRadius={"5px"}
              marginTop="5px"
              border={"1px solid black"}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password:</FormLabel>
            <InputGroup>
              <Input
                width="100%"
                type={show ? "text" : "password"}
                p="5px"
                borderRadius={"5px"}
                marginTop="5px"
                border={"1px solid black"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement
                width="4.5rem"
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  mt="10px"
                  bg="transparent"
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>
        <VStack marginTop="2.3rem" spacing={4} align="stretch" color={"black"}>
          <Button
            color="white"
            _hover={{ bg: "#89CFF0" }}
            bg="#00bfff"
            isLoading={loading}
            loadingText="loading..."
            borderRadius={"15px"}
            fontWeight={600}
            fontSize={"15px"}
            padding="10px"
            width="100%"
            onClick={(e) => {
              submitDetails(e);
            }}
          >
            Login
          </Button>
          <Button
            color="white"
            _hover={{ bg: "#ff726f" }}
            bg="red"
            borderRadius={"15px"}
            fontWeight={600}
            fontSize={"15px"}
            padding="10px"
            width="100%"
            marginTop="15px"
            onClick={() => {
              LoginGuest();
            }}
          >
            Get Guest User Credientials
          </Button>
        </VStack>
      </Container>
    </>
  );
};
Login.propTypes = {
  props: PropTypes.any,
};
export default Login;
