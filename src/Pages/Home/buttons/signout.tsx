import {
  Button,
  Image,
  MenuItem,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import src from "../../../assets/icons/out.jpg";
const Signout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const signout = () => {
    localStorage.clear();
    navigate("/signin");
  };
  return (
    <>
      <MenuItem onClick={onOpen}>
        {" "}
        <Image src={src} height="25px" width="25px" marginRight="5px" />
        ለመውጣት
      </MenuItem>
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
export default Signout;
