import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { SocketContext } from "../../Context/socketContext";
import { AckEvent } from "../../../utils/types/socketEvents";
import { Transaction } from "../../../utils/types/data";

type Props = {
  trans: Transaction;
};

const ApproveTransaction = ({ trans }: Props) => {
  const { socket } = useContext(SocketContext);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();
  const approveTransaction = () => {
    socket.emit("approve", trans._id, (res: AckEvent) => {
      if (res.code == 200) {
        onClose();
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

  return (
    <>
      <Button onClick={onOpen}>approve</Button>
      <Modal size={["lg", "xl"]} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader w="max-content">Approve Transaction?</ModalHeader>
          <ModalBody paddingTop="10px">
            <Flex flexDir="column" gap="3px">
              <Text fontSize={["larger"]}>
                Name: {trans.fname} {trans.lname}{" "}
              </Text>

              <Text fontSize={["larger"]}>Bank: {trans.name} </Text>
              <Text fontSize={["larger"]}>account: {trans.account} </Text>
              <Text fontSize={["larger"]}>amount: {trans.amount} </Text>
            </Flex>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={approveTransaction}>
              Approve
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ApproveTransaction;
