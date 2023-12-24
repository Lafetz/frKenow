import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../Context/socketContext";
import { AckEvent } from "../../../utils/types/socketEvents";
import { useNavigate } from "react-router-dom";
import { Bank } from "../../../utils/types/data";

const Withdraw = () => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { socket } = useContext(SocketContext);
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const onAccountChange = (e: any) => {
    setAccount(e.target.value);
  };
  const [select, setSelect] = useState("");
  const selectChange = (e: any) => {
    setSelect(e.target.value);
  };
  const onAmountChange = (e: any) => {
    setAmount(e.target.value);
  };
  const toast = useToast();
  const withdrawMoney = () => {
    socket.emit("transactions", amount, select, account, (res: AckEvent) => {
      if (res.code == 200) {
        toast({
          title: "Success",
          description: res.description,
          status: "success",
          duration: 4000,
          isClosable: true,
        });
        navigate("/transactions");
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
  useEffect(() => {
    const onBanks = (res: AckEvent) => {
      if (res.code == 200) {
        setBanks(res.payload);
      } else {
        toast({
          title: "Error",
          description: "internal server error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
    socket.emit("banks", onBanks);

    return () => {
      socket.off("banks", onBanks);
    };
  }, []);
  return (
    <>
      <MenuItem onClick={onOpen}>Withdraw</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px">
            <Select
              isRequired
              placeholder="Select Bank"
              value={select}
              onChange={selectChange}
            >
              {banks.map((b) => {
                return (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                );
              })}
            </Select>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <NumberInput isRequired value={amount}>
                <NumberInputField onChange={onAmountChange} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Account</FormLabel>
              <NumberInput isRequired value={account}>
                <NumberInputField onChange={onAccountChange} />
              </NumberInput>
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={withdrawMoney}>
              Withdraw
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default Withdraw;
