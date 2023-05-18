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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
const Signup = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [onHover, setOnHover] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const postDetails = async (pic) => {
    setLoading(true);
    if (!pic) {
      toast({
        title: "Please Select an Image!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    if (pic.type === "image/jpeg" || pic.type == "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat_app");
      data.append("cloud_name", "abdulwahabraza");
      // const res = await axios(
      //   "https://api.cloudinary.com/v1_1/abdulwahabraza",
      //   {
      //     mathod: "POST",
      //     body: data,
      //   }
      // );
      // console.log("This is response ", res);
      // setLoading(false);
      // .then((response) => {
      //   console.log(response);
      //   setImage(response.data.secure_url);
      //   setLoading(false);
      // })
      // .catch((error) => {
      //   console.log(error);
      //   setLoading(false);
      // });

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/abdulwahabraza/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const tempData = await res.json();
      if (tempData.url) {
        setImage(tempData.url.toString());
        setLoading(false);
        toast({
          title: "Select jpeg/png format!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setLoading(false);
        toast({
          title: "Error in uploading image!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Select jpeg/png format!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };
  const submitDetails = async () => {
    if (name || email || password || cPassword) {
      if (password === cPassword) {
        const res = await axios.post("/user", {
          name,
          email,
          password,
        });
        const data = await res.json();
        console.log("This is data ", data);
        toast({
          title: "Information Succesfully upload!",
          status: "successful",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Password not matching!",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Fill all information!",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Container m="40px">
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
            isLoading={loading}
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
