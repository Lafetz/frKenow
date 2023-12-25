import { Flex, Heading } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { GameStatus } from "../../utils/types/socketEvents";
import { SocketContext } from "../Context/socketContext";

const GameS = () => {
  const { socket } = useContext(SocketContext);
  const [gameStatus, setGameStatus] = useState<GameStatus>();

  useEffect(() => {
    socket.emit("game_status", (res: GameStatus) => {
      setGameStatus(res);
    });
  }, []);
  useEffect(() => {
    const onGameStatus = (res: GameStatus) => {
      setGameStatus(res);
    };
    socket.on("game_status", onGameStatus);

    return () => {
      socket.off("bet", onGameStatus);
    };
  }, []);
  return (
    <>
      <Flex color="#103d4d" flexDir="column" alignItems="center" gap="15px">
        <Heading as="h1" size={["2xl", "xl"]} noOfLines={3}>
          Game #{gameStatus?.gameno && <>{Number(gameStatus?.gameno)}</>}
        </Heading>
        <Heading as="h1" size={["xl", "lg"]} noOfLines={1}>
          BET {gameStatus?.minBet}
        </Heading>
        {gameStatus && (
          <Flex gap="3px" alignItems="center" justifyContent="center">
            <Heading as="h2" size={["xs"]} noOfLines={1}>
              First Prize: {Number(gameStatus?.first)}
            </Heading>
            <Heading as="h2" size={["xs"]} noOfLines={1}>
              Second Prize: {Number(gameStatus?.second)}
            </Heading>
            <Heading as="h2" size={["xs"]} noOfLines={1}>
              Third Prize: {Number(gameStatus?.third)}
            </Heading>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default GameS;
