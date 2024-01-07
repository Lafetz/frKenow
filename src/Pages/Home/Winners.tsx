import {
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import Winner from "./Winner";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../Context/socketContext";
import { Report } from "../../utils/types/data";
import { AckEvent } from "../../utils/types/socketEvents";
import src from "../../assets/moneyIcon.png";
type Props = {
  status: any;
};
const Winners = ({ status }: Props) => {
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
  }, [status]);
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
        <Text color="#1e3f2e" fontSize="x-large" as="b" paddingX="10px">
          ዊነርስ
        </Text>
        <Image height="40px" src={src} />
      </Flex>
      <Flex
        gap="15px"
        bg="#fef79d"
        flexDir="column"
        padding="10px"
        minW="250px"
        borderRadius="md"
      >
        {" "}
        <TableContainer maxW="350px">
          <Table size={["sm"]} colorScheme="orange">
            <Thead>
              <Tr>
                <Th>{""}</Th>
                <Th>
                  <Text color="#693f62" as="b" fontSize="md" maxW={"20px"}>
                    የጨዋታ ቁጥር
                  </Text>
                </Th>
                <Th>
                  <Text color="#693f62" as="b" fontSize="md">
                    ምስል
                  </Text>
                </Th>
                <Th>
                  <Text color="#693f62" as="b" fontSize="md">
                    ብር
                  </Text>
                </Th>
                <Th>
                  <Text color="#693f62" as="b" fontSize="md">
                    ብር
                  </Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
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
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </Flex>
  );
};
export default Winners;
