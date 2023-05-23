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
const Signup = () => {
  const history = useNavigate();
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const postDetails = async (pic) => {
    try {
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
            title: "Successful!",
            description: "Image Uploaded",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        } else {
          setLoading(false);
          toast({
            title: "Error!",
            description: "Error while uploading image",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "bottom",
          });
        }
      } else {
        toast({
          title: "Format error",
          description: "Select jpeg/png format!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        return;
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  const submitDetails = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (name && email && password && cPassword) {
        if (password === cPassword) {
          const res = await fetch("/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
              pic: image,
            }),
          });
          if (res.status === 201) {
            const data = await res.json();
            localStorage.setItem("userInfo", data);
            setLoading(false);
            history("/chat");
          } else {
            setLoading(false);
            toast({
              title: "Error!",
              description: "Enter another mail!",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        } else {
          setLoading(false);
          toast({
            title: "Error!",
            description: "password not matching",
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
          description: "Fill all information!",
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
  return (
    <>
      <Container>
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
          <FormControl id="submit" width="100%">
            <Button
              _hover={{ bg: "#89CFF0" }}
              bg="#00bfff"
              borderRadius={"15px"}
              cursor={"pointer"}
              color="white"
              fontWeight={600}
              fontSize={"15px"}
              padding="10px"
              width="100%"
              height="auto"
              marginTop="15px"
              isLoading={loading}
              loadingText="loading..."
              spinnerPlacement="start"
              onClick={(e) => {
                submitDetails(e);
              }}
            >
              Sign Up
            </Button>
          </FormControl>
        </VStack>
      </Container>
    </>
  );
};
Signup.propTypes = {
  props: PropTypes.any,
};
export default Signup;
