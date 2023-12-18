import { useContext, useEffect, useState } from "react";
import { Ball } from "../../utils/types/Game";
import { Flex, Heading, Text, Wrap, useToast } from "@chakra-ui/react";
import { BallComponent } from "./Ball";
import { SocketContext } from "../Context/socketContext";

import { AckEvent, GameStatus } from "../../utils/types/socketEvents";
import { fillBalls } from "../../utils/game/helpers";
import { EndPopup } from "./EndPopup";
import { User } from "../../utils/types/data";
import GameS from "./Gamestatus";
type Props = {
  user: any;
  setUser: any;
};
export const Game = ({ user, setUser }: Props) => {
  console.log(user);
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [balls, setBalls] = useState<Ball[]>([]);
  const [userBalls, setUserBalls] = useState<Ball[]>([]);
  const [status, setStatus] = useState<GameStatus>();
  if (!socket) {
    return <></>;
  }
  useEffect(() => {
    setBalls(fillBalls());
    socket.emit("game_status", (res: GameStatus) => {
      if (res) {
        setStatus(res);
        setBalls(res.balls);
        const userBalls = res.balls.filter((b) => {
          return b.username == user.username;
        });
        setUserBalls(userBalls);
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
  }, []);

  useEffect(() => {
    const onBet = (balls: Ball[]) => {
      setBalls(balls);

      const userBalls = balls.filter((b) => {
        return b.username == user.username;
      });
      setUserBalls(userBalls);
    };
    const onGameStatus = (gameStatus: GameStatus) => {
      setStatus(gameStatus);
    };
    socket.on("game_status", onGameStatus);
    socket.on("bet", onBet);

    return () => {
      socket.off("bet", onBet);
      socket.off("game_status", onGameStatus);
    };
  }, []);

  return (
    <Flex
      paddingY="15px"
      flexDir="column"
      alignItems="center"
      justifySelf="center"
      gap="15px"
    >
      {status?.started && <GameS />}

      {!status?.started && (
        <Flex color="#103d4d" gap="5px" flexDir="column" alignItems="center">
          <Text as="b" fontSize="2xl">
            Game didn't start yet!
          </Text>
        </Flex>
      )}
      {/* <Flex color="#103d4d" flexDir="column" alignItems="center" gap="15px">
        <Heading as="h1" size="2xl" noOfLines={1}>
          BET 200
        </Heading>
        <Heading as="h2" size="lg" noOfLines={1}>
          MAX PAYOUT 6000 ETB
        </Heading>maxW="580px"
      </Flex> */}
      <Wrap w={[350, 580]}>
        {balls.map((b, i) => {
          return <BallComponent key={i} ball={b}></BallComponent>;
        })}
      </Wrap>
      <>
        {userBalls.length === 0 && status?.started && (
          <Flex color="#103d4d" gap="5px" flexDir="column" alignItems="center">
            <Text as="b" fontSize="2xl" textAlign="center">
              You haven't selected any balls yet!
            </Text>
            <Text as="b" fontSize="2xl">
              Click on the balls to Bet!
            </Text>
          </Flex>
        )}
        {userBalls.length > 0 && (
          <Wrap maxW="350px">
            {userBalls.map((b, i) => {
              return <BallComponent key={i} ball={b}></BallComponent>;
            })}
          </Wrap>
        )}
      </>

      <EndPopup />
    </Flex>
  );
};
