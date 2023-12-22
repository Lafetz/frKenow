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
  Text,
  Flex,
} from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0%  {   transform: scale(0.70) rotate(270deg); right:-80px }
  25%  {  transform: scale(1) rotate(0); right:5px }
  100%  {   right:5px }
`;

const animation = `${animationKeyframes} 5s ease-in-out 3`;

import { Ball } from "../../utils/types/Game";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";
import box from "../../assets/box.png";
type Props = {
  setUser: any;
};
export const EndPopup = ({ setUser }: Props) => {
  const { socket } = useContext(SocketContext);
  if (!socket) {
    return <></>;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  //const [animation, setAnimation] = useState<string>(animationF);
  //const [winningBalls, setWinningBalls] = useState<Ball[]>([]);
  const [first, setFirst] = useState<number | undefined>();
  const [second, setSecond] = useState<number | undefined>();
  const [third, setThird] = useState<number | undefined>();
  const [number, setNumber] = useState(0);
  useEffect(() => {
    const onGameEnd = async (winningBalls: Ball[]) => {
      onOpen();
      setFirst(undefined);
      setSecond(undefined);
      setThird(undefined);
      // setWinningBalls(winningBalls);
      setTimeout(() => {}, 15000);
      for (let i = 0; i < 3; i++) {
        setNumber(winningBalls[i].number);

        await new Promise((resolve) => setTimeout(resolve, 5000));
        if (i == 0) {
          setFirst(winningBalls[0].number);
        } else if (i == 1) {
          setSecond(winningBalls[1].number);
        } else {
          setThird(winningBalls[2].number);
        }
        console.log(number);
      }

      socket.emit("user", (res: AckEvent) => {
        if (res.code == 200) {
          setUser(res.payload);
        }
      });
    };
    socket.on("game_end", onGameEnd);

    return () => {
      socket.off("game_end", onGameEnd);
    };
  }, []);
  const closeModal = () => {
    onClose();
  };
  return (
    <>
      <Modal size="lg" onClose={closeModal} isOpen={isOpen} isCentered>
        {/* <ModalOverlay /> */}
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
        />
        <ModalContent>
          <Center>
            <ModalHeader>Game Ended</ModalHeader>
          </Center>
          <ModalBody>
            <Center>
              <Flex
                height="100px"
                width="250px"
                backgroundImage={box}
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                justifyContent="center"
                alignItems="center"
              >
                <Flex
                  onAnimationIteration={() => {}}
                  marginRight="-5px"
                  as={motion.div}
                  animation={animation}
                  position="relative"
                  right="5px"
                  borderRadius="100%"
                  height="70px"
                  width="70px"
                  bg="#f9d61a"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Text fontSize="4xl" as="b">
                    <Center>{number}</Center>
                  </Text>
                </Flex>
              </Flex>
            </Center>
            <Flex
              color="#103d4d"
              paddingY="15px"
              justifyContent="center"
              gap="15px"
            >
              <Text fontSize={["4xl", "3xl"]} as="b">
                {first ? first : <></>}
              </Text>
              <Text fontSize={["4xl", "3xl"]} as="b">
                {second ? second : <></>}
              </Text>
              <Text fontSize={["4xl", "3xl"]} as="b">
                {third ? third : <></>}
              </Text>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Center>
              <Button onClick={closeModal}>Close</Button>
            </Center>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
