import {
  Button,
  Image,
  MenuItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../Context/socketContext";
import { AckEvent } from "../../../utils/types/socketEvents";
import { Report } from "../../../utils/types/data";
import { texts } from "../../../utils/game/images";
import src from "../../../assets/icons/bio.jpg";
const PastGames = () => {
  const { socket } = useContext(SocketContext);
  const [games, setGames] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refresh, setRefresh] = useState(0);
  const changeRefresh = () => {
    const num = refresh == 0 ? 1 : 0;
    setRefresh(num);
  };
  const toast = useToast();
  useEffect(() => {
    const onPast = (res: AckEvent) => {
      if (res.code == 200) {
        setGames(res.payload);
      } else {
        toast({
          title: "Error",
          description: "internal server error",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    };
    socket.emit("pastgames", onPast);

    return () => {
      socket.off("pastgames", onPast);
    };
  }, [refresh]);

  return (
    <>
      <MenuItem onClick={onOpen}>
        {" "}
        <Image src={src} height="25px" width="25px" marginRight="5px" />
        ያለፉ ጨዋታዎች
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody paddingTop="50px">
            <Button onClick={changeRefresh}>Refresh</Button>
            {games.length != 0 && (
              <TableContainer>
                <Table size={["sm"]} variant="striped" colorScheme="orange">
                  <TableCaption>Transactions</TableCaption>
                  <Thead>
                    <Tr>
                      {/* <Th>Date</Th> */}
                      <Th>የጨዋታ ቁጥር</Th>
                      <Th>ምስል</Th>
                      <Th>username</Th>
                      <Th>ብር</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {games?.map((g: Report, i: number) => {
                      return g.winners.map((u, j) => {
                        u;
                        return (
                          <Tr key={`${i} ${j}`}>
                            {/* <Td>{new Date(g.timestamp).toDateString()}</Td> */}
                            <Td>{games[i].gameno}</Td>
                            <Td>{texts[games[i].balls[j] - 1]}</Td>
                            <Td>
                              {j == 0
                                ? games[i].first
                                : j == 1
                                ? games[i].second
                                : games[i].third}
                              ETB
                            </Td>
                            <Td>@{games[i].winners[j]}</Td>
                          </Tr>
                        );
                      });
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            )}
          </ModalBody>
          {/* 
          <ModalFooter justifyContent="center"> {
  padding-left: 4px;
  padding-right: 4px;
}
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={loading}
              colorScheme="green"
              onClick={depositMoney}
            >
              Deposit
            </Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};
export default PastGames;
