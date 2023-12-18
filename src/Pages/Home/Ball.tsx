import {
  Button,
  Center,
  Flex,
  Text,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { Ball } from "../../utils/types/Game";
import { SocketContext } from "../Context/socketContext";
import { useContext } from "react";
import { AckEvent } from "../../utils/types/socketEvents";

type Props = {
  ball: Ball;
};
export const BallComponent = ({ ball }: Props) => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placeBet = () => {
    socket.emit("bet", ball.number, (res: AckEvent) => {
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

      onClose();
    });
  };
  return (
    <>
      <WrapItem
        onClick={onOpen}
        w="48px"
        h="48px"
        borderRadius="100%"
        bg={ball.username == "" ? "#970db2" : "blue"}
        color="white"
        padding="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Text>{ball.number}</Text>
      </WrapItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="5px">
            <Flex flexDir="column" gap="15px">
              <Center>
                <Text fontSize="xl" as="b">
                  Place Bet on {ball.number}
                </Text>
              </Center>
            </Flex>
          </ModalBody>

          <ModalFooter justifyContent="center">
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="green" onClick={placeBet}>
              Place Bet
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
