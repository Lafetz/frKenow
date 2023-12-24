import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldError = {
  message: string;
  field: string;
};
type Props = {
  isOpen: any;
  onClose: any;
};
const ForgotPass = ({ isOpen, onClose }: Props) => {
  const toast = useToast();
  const [fielderrors, setFieldErrors] = useState<FieldError[]>();
  const [otp, setOtp] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const confirmChange = (e: any) => {
    setConfirm(e.target.value);
  };
  const onOtpChange = (e: any) => {
    setOtp(e.target.value);
    console.log(otp);
  };
  const passwordChange = (e: any) => {
    setPassword(e.target.value);
  };
  const numberChange = (e: any) => {
    setNumber(e.target.value);
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [disable, setdisable] = useState(false);
  const requestOtp = async () => {
    try {
      setdisable(true);
      const res = await fetch("http://localhost:8080/otpForgot", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ number }),
      });
      setdisable(false);
      if (res.status === 201) {
        toast({
          title: "Otp",
          description: "Otp sent",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      } else if (res.status === 403) {
        const errorResponse = await res.json();
        setFieldErrors(errorResponse.errors);
      } else {
        console.log(res);
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
      setdisable(false);
    }
  };
  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = {
      otp,
      number,
      password,
      confirm,
    };
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/update", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
      setLoading(false);
      setFieldErrors([]);
      if (res.status === 201) {
        toast({
          title: "Account Updated.",
          description: "Sign in to continue",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/signin");
      } else if (res.status === 403) {
        const errorResponse = await res.json();

        setFieldErrors(errorResponse.errors);
      } else if (res.status == 422) {
        setLoading(false);
        toast({
          title: "Error",
          description: "Incorrect Otp",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (res.status == 404) {
        setLoading(false);
        toast({
          title: "Error",
          description: "otp expired",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
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
      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>new password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Phone number:</FormLabel>
              <Input
                onChange={numberChange}
                placeholder="09******"
                type="tel"
                variant="filled"
                mb={3}
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
            <FormControl mt={4}>
              <FormLabel>Code</FormLabel>
              <Input minLength={4} onChange={onOtpChange} placeholder="Otp" />
              <Box>
                {fielderrors?.map((err, i) => {
                  if (err.field === "otp") {
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
              disabled={disable}
              colorScheme="orange"
              width="100%"
              marginY="10px"
              onClick={requestOtp}
            >
              Request Code
            </Button>
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
                        {err.message}
                      </Text>
                    );
                  }
                })}
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={submitForm}
              colorScheme="blue"
              mr={3}
            >
              submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ForgotPass;
