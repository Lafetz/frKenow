import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SocketContext } from "../../Context/socketContext";
import { AckEvent } from "../../../utils/types/socketEvents";

type Props = {
  username: string;
};

const RemoveUser = ({ username }: Props) => {
  const { socket } = useContext(SocketContext);

  const toast = useToast();
  const depositMoney = () => {
    socket.emit("remove", username, (res: AckEvent) => {
      if (res.code == 200) {
        console.log(res.payload);
        toast({
          title: "Success",
          description: res.description,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } else if (res.code == 400) {
        toast({
          title: "Error",
          description: res.description,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "internal server error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    });
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Remove</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader w="max-content">Remove User {username}?</ModalHeader>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={depositMoney}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default RemoveUser;
