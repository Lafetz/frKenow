import {
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
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field } from "../../utils/types/data";

type Props = {
  field: Field;
  setFieldErrors: any;
  isOpen: any;
  onClose: any;
};
const OtpInput = ({ setFieldErrors, field, isOpen, onClose }: Props) => {
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const onOtpChange = (e: any) => {
    setOtp(e.target.value);
  };
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitForm = async (e: any) => {
    e.preventDefault();
    const data = {
      ...field,
      otp,
    };

    setLoading(true);
    try {
      const res = await fetch("https://daclan.onrender.com/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLoading(false);

      if (res.status === 201) {
        toast({
          title: "Account created.",
          description: "Sign in to continue",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        navigate("/signin");
      } else if (res.status === 403) {
        const errorResponse = await res.json();
        onClose();
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
          <ModalHeader>Verify Phone number</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Code</FormLabel>
              <Input onChange={onOtpChange} placeholder="Otp" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              isLoading={loading}
              onClick={submitForm}
              colorScheme="blue"
              mr={3}
            >
              Verify
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default OtpInput;
