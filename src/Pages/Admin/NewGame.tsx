import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  useToast,
} from "@chakra-ui/react";
import AdminHeader from "./Header";
import { useContext, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
import CurrentGame from "./currentGame";

const NewGame = () => {
  const [betAmount, setBetAmount] = useState(200);
  const { socket } = useContext(SocketContext);
  const onAmountChange = (e: any) => {
    setBetAmount(e.target.value);
  };
  const toast = useToast();
  const startGame = () => {
    socket.emit("start", betAmount, (res: AckEvent) => {
      if (res.code == 200) {
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
    <Flex flexDir="column">
      <AdminHeader />
      <CurrentGame socket={socket} />
      <Center>
        <Flex
          justifyContent="center"
          alignItems="center"
          maxWidth="300px"
          flexDir="column"
          paddingY="20px"
          gap="30px"
        >
          <Text as="b" fontSize={"xl"}>
            Start Game
          </Text>
          <FormControl>
            <FormLabel>Min Bet Amount</FormLabel>
            <NumberInput value={betAmount}>
              <NumberInputField onChange={onAmountChange} />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <Button onClick={startGame}>Start</Button>
        </Flex>
      </Center>
    </Flex>
  );
};
export default NewGame;
