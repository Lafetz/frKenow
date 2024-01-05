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
  useToast,Image
} from "@chakra-ui/react";
import { Ball } from "../../utils/types/Game";
import { SocketContext } from "../Context/socketContext";
import { useContext } from "react";
import { AckEvent } from "../../utils/types/socketEvents";
import { images, texts } from "../../utils/game/images";

type Props = {
  ball: Ball;
  setUser: any;
};
export const BallComponent = ({ ball, setUser }: Props) => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placeBet = () => {
    socket.emit("bet", ball.number, (res: AckEvent) => {
      if (res.code == 200) {
        setUser(res.payload);
        toast({
          title: "Success",
          description: `you have placed bet on ${texts[ball.number-1]}`,
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
        bg={ball.username == "" ? "#693f62" :  "#fef79d"}
        color="white"
        padding="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
             <Image
                w="40px"
                h="40px"
                borderRadius="100%"
          boxSize="100%"
          boxShadow='md'
        
          objectFit="fill"
          src={images[ball.number-1]}
          alt="jackpot banner"
        />
      </WrapItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="5px">
            <Flex flexDir="column" gap="15px">
              <Center>
                <Text fontSize="xl" as="b">
                  Place Bet on {texts[ ball.number-1]}
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
