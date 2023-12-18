import { Center, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GameStatus } from "../../utils/types/socketEvents";

const CurrentGame = ({ socket }: any) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>();

  //
  useEffect(() => {
    socket.emit("game_status", (res: GameStatus) => {
      setGameStatus(res);
      console.log(gameStatus, "res", res);
    });
  }, []);
  useEffect(() => {
    const onGameStatus = (res: GameStatus) => {
      setGameStatus(res);
      console.log(gameStatus, "res", res);
    };
    socket.on("game_status", onGameStatus);
    return () => {
      socket.off("bet", onGameStatus);
    };
  }, []);
  return (
    <Center marginTop="25px">
      {gameStatus && (
        <>
          {gameStatus.started && (
            <Text color="red" as="b" fontSize={"xl"}>
              There is an ongoing Game
            </Text>
          )}
        </>
      )}
      {!gameStatus && (
        <>
          <Spinner size="xl" />
        </>
      )}
    </Center>
  );
};
export default CurrentGame;
