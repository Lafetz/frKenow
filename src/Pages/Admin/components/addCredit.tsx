import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SocketContext } from "../../Context/socketContext";
import { AckEvent } from "../../../utils/types/socketEvents";

type Props = {
  username: string;
};

const AddCredit = ({ username }: Props) => {
  const { socket } = useContext(SocketContext);
  const [amount, setAmount] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };
  const toast = useToast();
  const depositMoney = () => {
    socket.emit("credit", username, amount, (res: AckEvent) => {
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
      <Button onClick={onOpen}>Add Credit</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader w="max-content">Add Credit to {username}?</ModalHeader>
          <ModalBody paddingTop="10px">
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <NumberInput value={amount}>
                <NumberInputField onChange={onAmountChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={depositMoney}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddCredit;
