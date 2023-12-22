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
import AdminHeader from "./components/Header";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
import CurrentGame from "./components/currentGame";
import { User } from "../../utils/types/data";
import { useNavigate } from "react-router-dom";

const NewGame = () => {
  const [betAmount, setBetAmount] = useState(200);
  const [first, setFirst] = useState(3000);
  const [second, setSecond] = useState(2000);
  const [third, setThird] = useState(1000);
  const { socket } = useContext(SocketContext);

  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    socket.emit("user", (res: AckEvent) => {
      if (res.code == 200) {
        setUser(res.payload);
        if (!res.payload.isAdmin) {
          navigate("/");
        }
      } else {
        toast({
          title: "server error",
          description: "unable to connect to server",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }, []);
  const onAmountChange = (e: any) => {
    setBetAmount(e.target.value);
  };
  const onFirst = (e: any) => {
    setFirst(e.target.value);
  };
  const onSecond = (e: any) => {
    setSecond(e.target.value);
  };
  const onThird = (e: any) => {
    setThird(e.target.value);
  };

  const startGame = () => {
    socket.emit("update", betAmount, first, second, third, (res: AckEvent) => {
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
    <>
      {user && (
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
              <FormControl>
                <FormLabel>First Prize</FormLabel>
                <NumberInput value={first}>
                  <NumberInputField onChange={onFirst} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Second Prize</FormLabel>
                <NumberInput value={second}>
                  <NumberInputField onChange={onSecond} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Third Prize</FormLabel>
                <NumberInput value={third}>
                  <NumberInputField onChange={onThird} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Button onClick={startGame}>Update </Button>
            </Flex>
          </Center>
        </Flex>
      )}
    </>
  );
};
export default NewGame;
