import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPass from "./forgot";
type FieldError = {
  message: string;
  field: string;
};
import { Link as ChakraLink } from "@chakra-ui/react";
export const Sigin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [fielderrors, setFieldErrors] = useState<FieldError[]>();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };

  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };

    setLoading(true);
    const res = await fetch("https://daclan.onrender.com/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setFieldErrors([]);
    setLoading(false);
    if (res.status === 200) {
      const token = await res.json();
      window.localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
      window.location.reload();
    } else if (res.status === 401) {
      setError("incorrect username or password");
    } else if (res.status === 403) {
      const errorResponse = await res.json();
      setFieldErrors(errorResponse.errors);
      //setFieldErrors();
    } else {
      setLoading(false);
      toast({
        title: "Server Error.",
        description: "There was a problem processing your Request",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <ForgotPass isOpen={isOpen} onClose={onClose} />
      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        paddingX="15px"
      >
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <Center>
            <Heading mb={6}>Sign In</Heading>
          </Center>
          <FormControl>
            <FormLabel>Username:</FormLabel>
            <Input
              onChange={usernameChange}
              placeholder="example"
              type="text"
              variant="filled"
              mb={3}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "username") {
                  return (
                    <Text key={i} color="red" flexDir="column">
                      {" "}
                      {err.message}
                    </Text>
                  );
                }
              })}
            </Box>
          </FormControl>
          <FormControl>
            <FormLabel>Password:</FormLabel>
            <Input
              onChange={passwordChange}
              placeholder="**********"
              type="password"
              variant="filled"
              mb={1}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "password") {
                  return (
                    <Text key={i} color="red" flexDir="column">
                      {" "}
                      {err.message}
                    </Text>
                  );
                }
              })}
            </Box>
          </FormControl>
          <Text color="red">{error}</Text>
          <Button
            isLoading={loading}
            marginY={"5px"}
            onClick={submitForm}
            colorScheme="blue"
            mb={8}
          >
            Sign in
          </Button>
          <Box>
            <Text w="max-content">
              You don't an account?{" "}
              <Link
                style={{
                  color: "#60A5FA",
                  fontWeight: "bold",
                }}
                to="/signup"
                color=" blueviolet"
              >
                Sign Up
              </Link>
            </Text>
          </Box>
          <Center>
            <ChakraLink
              style={{
                fontWeight: "bold",
              }}
              onClick={onOpen}
            >
              forgotten password?
            </ChakraLink>{" "}
          </Center>
        </Flex>
      </Flex>
    </>
  );
};
