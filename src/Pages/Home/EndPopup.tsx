import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Button,
  Center,
  WrapItem,
  Wrap,
  Text,
} from "@chakra-ui/react";
import { Ball } from "../../utils/types/Game";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
type Props = {
  setUser: any;
};
export const EndPopup = ({ setUser }: Props) => {
  const { socket } = useContext(SocketContext);
  if (!socket) {
    return <></>;
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [winningBalls, setWinningBalls] = useState<Ball[]>([]);

  useEffect(() => {
    const onGameEnd = (winningBalls: Ball[]) => {
      setWinningBalls(winningBalls);
      socket.emit("user", (res: AckEvent) => {
        if (res.code == 200) {
          setUser(res.payload);
        }
      });

      onOpen();
    };
    socket.on("game_end", onGameEnd);

    return () => {
      socket.off("game_end", onGameEnd);
    };
  }, []);

  return (
    <>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Center>
            <ModalHeader>Game Ended</ModalHeader>
          </Center>
          <ModalBody>
            <Wrap spacing="30px" justify="center" height="100px">
              <WrapItem width="60px">
                <Text margin="auto" fontSize="5xl" as="b">
                  {winningBalls[0]?.number}
                </Text>
              </WrapItem>
              <WrapItem width="60px">
                <Text margin="auto" fontSize="5xl" as="b">
                  {winningBalls[1]?.number}
                </Text>
              </WrapItem>
              <WrapItem width="60px">
                <Text margin="auto" fontSize="5xl" as="b">
                  {winningBalls[2]?.number}
                </Text>
              </WrapItem>
            </Wrap>
          </ModalBody>
          <ModalFooter>
            <Center>
              <Button onClick={onClose}>Close</Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
