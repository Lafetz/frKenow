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
        <Heading as="h1" size={["xl", "xl"]} noOfLines={3}>
          ጨዋታ #{gameStatus?.gameno && <>{Number(gameStatus?.gameno)}</>}
        </Heading>
        <Heading as="h1" size={["xl", "lg"]} noOfLines={1}>
          መደብ {gameStatus?.minBet} ብር
        </Heading>
        {gameStatus && (
          <Flex gap="20px" alignItems="center" justifyContent="space-between">
            <Heading as="h2" size={["sm"]} noOfLines={1}>
              1ኛ: {Number(gameStatus?.first)} ብር
            </Heading>
            <Heading as="h2" size={["sm"]} noOfLines={1}>
              2ኛ: {Number(gameStatus?.second)} ብር
            </Heading>
            <Heading as="h2" size={["sm"]} noOfLines={1}>
              3ኛ: {Number(gameStatus?.third)} ብር
            </Heading>
          </Flex>
        )}
      </Flex>
    </>
  );
};
export default GameS;
