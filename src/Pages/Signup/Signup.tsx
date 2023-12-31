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
import { Link } from "react-router-dom";
import OtpInput from "./otpInput";
type FieldError = {
  message: string;
  field: string;
};
export const Sigup = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [fielderrors, setFieldErrors] = useState<FieldError[]>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmChange = (e: any) => {
    setConfirm(e.target.value);
  };

  const fnameChange = (e: any) => {
    setFname(e.target.value);
  };
  const lnameChange = (e: any) => {
    setLname(e.target.value);
  };
  const usernameChange = (e: any) => {
    setUsername(e.target.value);
  };
  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const numberChange = (e: any) => {
    setNumber(e.target.value);
  };
  // const navigate = useNavigate();
  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = {
      fname,
      lname,
      confirm,
      number,
      username,
      password,
    };
    setLoading(true);
    try {
      const res = await fetch("https://daclan.onrender.com/otpSignup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);
      setFieldErrors([]);
      if (res.status === 201) {
        toast({
          title: "otp",
          description: "we have sent verf",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        onOpen();
      } else if (res.status === 403) {
        const errorResponse = await res.json();

        setFieldErrors(errorResponse.errors);
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
    } catch (err) {
      setLoading(false);
    }
  };
  return (
    <>
      <OtpInput
        field={{
          fname,
          lname,
          confirm,
          number,
          username,
          password,
        }}
        isOpen={isOpen}
        setFieldErrors={setFieldErrors}
        onClose={onClose}
      />
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        paddingX="15px"
      >
        <Flex flexDirection="column" p={12} borderRadius={8} boxShadow="lg">
          <Center>
            <Heading mb={6}>Sign Up</Heading>
          </Center>

          <FormControl>
            <FormLabel>Phone number:</FormLabel>
            +251
            <Input
              onChange={numberChange}
              placeholder="9123456789"
              maxLength={9}
              type="tel"
              variant="filled"
              mb={3}
              minLength={9}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "number") {
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
            <FormLabel>First Name:</FormLabel>
            <Input
              onChange={fnameChange}
              placeholder="example"
              type="text"
              variant="filled"
              mb={3}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "fname") {
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
            <FormLabel>Last Name:</FormLabel>
            <Input
              onChange={lnameChange}
              placeholder="example"
              type="text"
              variant="filled"
              mb={3}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "lname") {
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
          <FormControl>
            <FormLabel>Confirm Password:</FormLabel>
            <Input
              onChange={confirmChange}
              value={confirm}
              placeholder="**********"
              type="password"
              variant="filled"
              mb={1}
            />
            <Box>
              {fielderrors?.map((err, i) => {
                if (err.field === "confirm") {
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
          <Button
            marginY={"5px"}
            isLoading={loading}
            onClick={submitForm}
            colorScheme="blue"
            mb={8}
          >
            SignUp
          </Button>

          <Box>
            <Text w="max-content">
              You have an account?{" "}
              <Link
                style={{
                  color: "#60A5FA",
                  fontWeight: "bold",
                }}
                to="/signin"
                color=" blueviolet"
              >
                Sign in
              </Link>
            </Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};
