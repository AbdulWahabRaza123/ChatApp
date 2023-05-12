import React, { useState } from "react";
import {
  Container,
  Box,
  Text,
  InputGroup,
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
const Login = () => {
  const [show, setShow] = useState(false);
  const [onHoverBlue, setOnHoverBlue] = useState(false);
  const [onHoverRed, setOnHoverRed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submitDetails = () => {
    console.log("This is login...");
  };
  return (
    <>
      <Container m="20px">
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
              <InputRightElement width="4.5rem" justifyContent={"center"}>
                <Button
                  h="2.75rem"
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
            bg={onHoverBlue ? "#89CFF0" : "#00bfff"}
            borderRadius={"15px"}
            onPointerEnter={() => {
              setOnHoverBlue(true);
            }}
            onPointerLeave={() => {
              setOnHoverBlue(false);
            }}
            fontWeight={600}
            fontSize={"15px"}
            padding="10px"
            width="100%"
            onClick={() => {
              submitDetails();
            }}
          >
            Login
          </Button>
          <Button
            color="white"
            bg={onHoverRed ? "#ff726f" : "red"}
            borderRadius={"15px"}
            onPointerEnter={() => {
              setOnHoverRed(true);
            }}
            onPointerLeave={() => {
              setOnHoverRed(false);
            }}
            fontWeight={600}
            fontSize={"15px"}
            padding="10px"
            width="100%"
            marginTop="15px"
            onClick={() => {
              submitDetails();
            }}
          >
            Get Guest User Credientials
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default Login;
