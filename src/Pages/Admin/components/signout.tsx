import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SignoutAdmin = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <>
      <Button size="md" colorScheme="orange" color="white" onClick={onOpen}>
        Sign out
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Out?</ModalHeader>

          <ModalFooter justifyContent="center">
            <Button colorScheme="green" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={signout}>
              Sign Out
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default SignoutAdmin;
