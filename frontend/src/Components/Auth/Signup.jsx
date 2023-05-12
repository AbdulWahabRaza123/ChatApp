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
const Signup = () => {
  const [show, setShow] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [image, setImage] = useState(null);
  const postDetails = (image) => {
    console.log("This is image ", image);
  };
  const submitDetails = () => {
    console.log("This is details");
  };
  return (
    <>
      <Container m="20px">
        <VStack marginTop="2rem" spacing={4} align="stretch" color={"black"}>
          <FormControl id="fName" isRequired>
            <FormLabel>Name:</FormLabel>
            <Input
              width="100%"
              p="5px"
              borderRadius={"5px"}
              marginTop="5px"
              border={"1px solid black"}
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </FormControl>

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
          <FormControl id="cPassword" isRequired>
            <FormLabel>Confirm Password:</FormLabel>
            <Input
              type={show ? "text" : "password"}
              width="100%"
              p="5px"
              borderRadius={"5px"}
              marginTop="5px"
              border={"1px solid black"}
              placeholder="Confirm your password"
              value={cPassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />
          </FormControl>
          <FormControl id="pic">
            <FormLabel>Upload your picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => {
                postDetails(e.target.files[0]);
              }}
            />
          </FormControl>
          <Button
            bg={onHover ? "#89CFF0" : "#00bfff"}
            borderRadius={"15px"}
            onPointerEnter={() => {
              setOnHover(true);
            }}
            onPointerLeave={() => {
              setOnHover(false);
            }}
            color="white"
            fontWeight={600}
            fontSize={"15px"}
            padding="10px"
            width="100%"
            marginTop="15px"
            onClick={() => {
              submitDetails();
            }}
          >
            Sign Up
          </Button>
        </VStack>
      </Container>
    </>
  );
};

export default Signup;
