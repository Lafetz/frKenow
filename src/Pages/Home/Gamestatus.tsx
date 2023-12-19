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
        <Heading as="h1" size="2xl" noOfLines={1}>
          BET {gameStatus?.minBet}
        </Heading>
        {gameStatus && (
          <Heading as="h2" size="lg" noOfLines={1}>
            MAX PAYOUT{" "}
            {+gameStatus?.first + gameStatus?.second + gameStatus?.third}
          </Heading>
        )}
      </Flex>
    </>
  );
};
export default GameS;
