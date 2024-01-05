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
  Image,
  Box,
} from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";

const animationKeyframes = keyframes`
  0%  {   transform: scale(0.60); right:-80px }
  25%  {  transform: scale(1);  right:5px }
  100%  {   right:5px }
`;

const animation = `${animationKeyframes} 5s ease-in-out 3`;

import { Ball } from "../../utils/types/Game";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { AckEvent } from "../../utils/types/socketEvents";

import { images, texts } from "../../utils/game/images";
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
  const [number, setNumber] = useState<number>(0);
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
        setNumber(0)
      }

      socket.emit("user", (res: AckEvent) => {
        if (res.code == 200) {
          setUser(res.payload);
        }
      });
    };
    
    // onGameEnd([{number:1,username:""},{number:4,username:""},{number:22,username:""}]);
    socket.on("game_end", onGameEnd);

    return () => {
      setFirst(undefined);
      setSecond(undefined);
      setThird(undefined);
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
                  height="100px"
                  width="100px"
                  justifyContent="center"
                  alignItems="center"
                 
                  backgroundSize="contain"
                  backgroundRepeat="no-repeat"
                >
               {number!==0&&<Image
          boxSize="100%"
          boxShadow='md'
          borderRadius="md"
          objectFit="fill"
          src={images[number-1]}
          alt="jackpot banner"
        />}  
                </Flex>
              </Flex>
            </Center>
            <Flex
              color="#103d4d"
              paddingY="15px"
              justifyContent="center"
              gap="15px"
            >
              
                {first ? <Box         w="80px"
        h="80px"
        borderRadius="100%"
        
        padding="5px"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDir="column"
        >
          <Image
        boxSize="100%"
        boxShadow='md'
        borderRadius="md"
        objectFit="fill"
        src={images[first-1]}
        alt="jackpot banner"
      />  <Text>{texts[first-1]}</Text></Box>: <></>}
             
            
                {second ?<Box         w="80px"
        h="80px"
        borderRadius="100%"
        padding="5px"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center">
      <Image
          boxSize="100%"
          boxShadow='md'
          borderRadius="md"
          objectFit="fill"
          src={images[second-1]}
          alt="jackpot banner"
        />
      <Text>{texts[second-1]}</Text>
      
      </Box> : <></>}
            
                {third ? <Box         w="80px"
        h="80px"
        borderRadius="100%"
      
        padding="5px"
        display="flex"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        
        ><Image
        boxSize="100%"
        boxShadow='md'
        borderRadius="md"
        objectFit="fill"
        src={images[third-1]}
        alt="jackpot banner"
      /> <Text>{texts[third-1]}</Text></Box> : <></>}
             
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
