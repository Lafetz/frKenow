import { Flex, Image, Text, useToast } from "@chakra-ui/react";
import Winner from "./Winner";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { Report } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";
import src from "../../assets/moneyIcon.png";
const Winners = () => {
  const { socket } = useContext(SocketContext);
  const toast = useToast();
  const [winners, setWinners] = useState<Report[]>();
  useEffect(() => {
    socket.emit("winners", (res: AckEvent) => {
      if (res.code == 200) {
        setWinners(res.payload);
      } else {
        toast({
          title: "server error",
          description: "unable to connect to server",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    });
  }, []);
  return (
    <Flex alignItems="center" flexDir="column" gap="5px">
      <Flex
        bg="#f9d61a"
        gap="10px"
        width="100%"
        alignItems="center"
        justifyContent="center"
        borderRadius="xl"
        paddingY="5px"
      >
        <Text color="#1e3f2e" fontSize="x-large" as="b">
          WINNERS
        </Text>
        <Image height="30px" src={src} />
      </Flex>
      <Flex gap="5px" bg="#fef79d" flexDir="column" padding="10px">
        {winners?.map((x, i) =>
          //@ts-ignore
          x.winners.map((r, k) => {
            return (
              <Winner
                key={`${i}${k}`}
                reports={winners}
                reportsI={i}
                reportI={k}
              />
            );
          })
        )}
      </Flex>
    </Flex>
  );
};
export default Winners;
